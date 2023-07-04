require('./system')
require('./manager')
const eventEmitter = require('./events');

eventEmitter.on('new-flight', (flightDetails) => {
    setTimeout(() => {
      console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'took-off');
      flightDetails.event = 'took_off';
      flightDetails.time = new Date();
      eventEmitter.emit('took-off', flightDetails);
    }, 4000);

    setTimeout(() => {
      console.log('Pilot: flight with ID', flightDetails.Details.flightID, 'has arrived');
      flightDetails.event = 'arrived';
      flightDetails.time = new Date();
      eventEmitter.emit('arrived', flightDetails);
    }, 7000);
  });