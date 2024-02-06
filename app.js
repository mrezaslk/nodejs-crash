const EvenEmitter = require('events');

const emitter = new EvenEmitter();

// Register a listener
emitter.on("messageLogged", (arg) => {
    console.log(arg.message);
})
//Raise an event 
emitter.emit('messageLogged', { id: 1, url: 'http:///', message: "here is the test" })


