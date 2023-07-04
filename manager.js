const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");
require("./pilot");
require("./system");
const eventEmitter = require("./events");

setInterval(() => {
  const flightId = uuidv4();
  const destination = faker.location.city();
  const pilotName = faker.person.firstName();

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
  eventEmitter.emit("new-flight", flightDetails);
}, 10000);
eventEmitter.on("arrived", (flightDetails) => {
  console.log(
    "Manager: we’re greatly thankful for the amazing flight,",
    flightDetails.Details.pilot
  );
});
