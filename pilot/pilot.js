"use strict";
require("dotenv").config();
const port = process.env.PORT || 3001;
const io = require("socket.io-client");
let host = `http://localhost:${port}/`;

let pilotSpace = `http://localhost:${port}/airline`;
const airLineConnection = io.connect(pilotSpace);
const pilotConnection = io.connect(host);


pilotConnection.on("new-flight", (flightDetails)=>{


  setTimeout(() => {
          console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'has arrived');
          flightDetails.event = 'arrived';
          flightDetails.time = new Date();
          pilotConnection.emit("arrived", flightDetails);

        }, 7000);

        setTimeout(() => {
              console.log(
                "Pilot: flight with ID",
                flightDetails.Details.flightID,
                "took-off"
              );
              flightDetails.event = "took_off";
              flightDetails.time = new Date();
              airLineConnection.emit("took-off", flightDetails);
            }, 4000);
            pilotConnection.emit('get_all')
            pilotConnection.on('flight',(payload)=>{
             console.log(`${flightDetails.Details.pilot}:Sorry i didn't catch this flight ${payload.id}`)

            })
            pilotConnection.on('flightarrived', (flight) => {
              console.log('i got it.');
              
              pilotConnection.emit('received', flight);
          });

});