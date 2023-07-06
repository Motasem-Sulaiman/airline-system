
"use strict";
require("dotenv").config();
const port = process.env.PORT || 3001;
const socket = require("socket.io");
const ioServer = socket(port);

ioServer.on("connection", (newSocket) => {
  console.log("connected to clients", newSocket.id);

  newSocket.on("new-flight", (flightDetails) => {
    console.log("Flight", flightDetails);
    ioServer.emit("new-flight", flightDetails);

  });

  newSocket.on("arrived", (flightDetails) => {
    console.log("Flight", flightDetails);
    ioServer.emit("arrived", flightDetails);
  });
});

const airline = ioServer.of("/airline");

airline.on("connection", (newSocket) => {
  console.log("NAME SPACE CONNECTED");
  newSocket.on("took-off", (flightDetails) => {
    console.log("Flight", flightDetails);
   
  });
});

// comment ...