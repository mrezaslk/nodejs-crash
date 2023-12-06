const express = require('express');
const app = express();


let users = require('./users');
// console.log(users);

global.config = require('./config');

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({
    extended: false
}))

// app.get('/', function (req, res) {
//     console.log(req.query);
//     res.send(`hello world ${req.query.username}`)
// })


app.get('/', function (req, res) {
    res.status(200).json({
        data: users,
        success: true,
    });
})

app.get('/:id', function (req, res) {
    let user = users.find((user) => {
        if (user.id === Number(req.params.id)) {
            return user;
        }
    })
    res.status(200).json({
        data: user,
        success: true,
    });
})

app.post('/', function (req, res) {
    // console.log(req.body);
    req.body.id = parseInt(req.body.id);
    users.push(req.body);
    res.json({
        data: 'user is add successfully'
    })
})



app.listen(config.port, () => {
    console.log(`server is runnig on port ${config.port}`);
})