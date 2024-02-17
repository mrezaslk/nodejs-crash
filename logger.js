const EvenEmitter = require('events');

// var url = 'http://mylogger.io/log';


class Logger extends EvenEmitter {
    log(message) {
        // send http req
        console.log(message);

        //Raise an event 
        this.emit('messageLogged', { id: 1, url: 'http:///' })
    }
}


module.exports = Logger
