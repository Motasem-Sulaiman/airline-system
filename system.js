const eventEmitter = require('./events');
require('./pilot')
require('./manager')


eventEmitter.on('new-flight', (flightDetails) => {
    console.log('Flight', flightDetails);
  });

  eventEmitter.on('took-off', (flightDetails) => {
    console.log('Flight', flightDetails);
  });

  eventEmitter.on('arrived', (flightDetails) => {
    console.log('Flight', flightDetails);
  });

