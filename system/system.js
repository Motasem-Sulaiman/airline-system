"use strict";
require("dotenv").config();
const uuid = require("uuid").v4;
const port = process.env.PORT || 3001;
const socket = require("socket.io");
const ioServer = socket(port);

const queue = {
  flights: {},
};

ioServer.on("connection", (newSocket) => {
  console.log("connected to clients", newSocket.id);

  newSocket.on("new-flight", (flightDetails) => {
    console.log("Flight", flightDetails);
    ioServer.emit("new-flight", flightDetails);
    const id = uuid();
    queue.flights[id] = flightDetails;
    ioServer.emit('flightarrived', {
      id: id,
      payload: queue.flights[id]
  })
  });

  newSocket.on("arrived", (flightDetails) => {
    console.log("Flight", flightDetails);

    ioServer.emit("arrived", flightDetails);

  });

  newSocket.on("get_all", () => {
    console.log(queue);
    Object.keys(queue.flights).forEach((id) => {
      newSocket.emit("flight", {
        id: id,
        payload:queue.flights[id]
        
      });
    });

  });
  newSocket.on('received', (flight) => {
   
    delete queue.flights[flight.id];
})
  });



const airline = ioServer.of("/airline");

airline.on("connection", (newSocket) => {
  console.log("NAME SPACE CONNECTED");
  newSocket.on("took-off", (flightDetails) => {
    console.log("Flight", flightDetails);
  });
});
