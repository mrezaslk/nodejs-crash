// var x =;
console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';

function log(message) {
    // send http req
    console.log(message);
}

module.exports = {
    log
}