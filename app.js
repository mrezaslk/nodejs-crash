const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello worl')
        res.end();
    }
});


// server.on('connection', (socket) => {
//     console.log('New Conection ...')
// })

server.listen(3000);

console.log('Listening on port 3000...');