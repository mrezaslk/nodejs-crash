const express = require('express');
const app = express();

global.config = require('./config');

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: false
}))

// Middleware
// app.use((req, res, next) => {
//     console.log('middleware1');
//     next();
// })

app.get('/', (req, res) => {
    console.log('yes ');
    res.send('home')
})



app.use('/user', require('./routes/user'));



app.listen(config.port, () => {
    console.log(`server is runnig on port ${config.port}`);
})