// const EvenEmitter = require('events');

const Logger = require('./middleware/logger')
const logger = new Logger();

// Register a listener
logger.on("messageLogged", (arg) => {
    console.log('listener called', arg);
})
logger.log('message')

