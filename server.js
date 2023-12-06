const express = require('express');
const app = express();

global.config = require('./config');

app.use(express.static(__dirname + "/public"));

// app.get('/', function (req, res) {
//     console.log(req.query);
//     res.send(`hello world ${req.query.username}`)
// })
app.get('/:username', function (req, res) {
    // console.log();
    res.send(`hello `)
})



app.listen(config.port, () => {
    console.log(`server is runnig on port ${config.port}`);
})