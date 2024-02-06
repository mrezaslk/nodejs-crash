const EvenEmitter = require('events');

const emitter = new EvenEmitter();

// Register a listener
emitter.on("messageLogged", function () {
    console.log('Listener called');
})
//Raise an event 
emitter.emit('messageLogged')