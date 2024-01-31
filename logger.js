var url = 'http://mylogger.io/log';

function log(message) {
    // send http req
    console.log(message);
}

module.exports = {
    log: log,
    // endpoint: url
}