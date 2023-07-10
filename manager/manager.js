"use strict";
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");


const port = process.env.PORT || 3001;
const io = require("socket.io-client");
let host = `http://localhost:${port}/`;
const managerConnection = io.connect(host);

setInterval(() => {
  const flightId = uuidv4();
  const destination = faker.location.city();
  const pilotName = faker.person.lastName();

  const flightDetails = {
    event: "new-flight",
    time: new Date(),
    Details: {
      airLine: "Royal Jordanian Airlines",
      destination: destination,
      pilot: pilotName,
      flightID: flightId,
    },
  };

  console.log("Manager: new flight with ID", flightId, "has been scheduled");
  managerConnection.emit("new-flight", flightDetails);
}, 10000);
managerConnection.on("arrived", (flightDetails) => {
  console.log(
    "Manager: we’re greatly thankful for the amazing flight,",
    flightDetails.Details.pilot
  );
});