const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator');


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

app.post('/', [
    check('email', 'email is not correct').isEmail(),
    check('password', 'password length is wrong').isLength({ min: 5 })
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    req.body.id = parseInt(req.body.id);
    users.push(req.body);
    res.json({
        data: 'user is add successfully'
    })
})

app.put('/:id', (req, res) => {
    users = users.map((user) => {
        if (user.id == req.params.id) {
            return req.body;
        } else {
            return user;
        }
    })
    res.json({
        data: 'user is update successfully'
    })
})

app.delete('/:id', (req, res) => {
    users = users.filter((user) => {
        if (user.id != req.params.id) {
            return user;
        }
    })
    res.json({
        data: 'user is delete successfully'
    })
})



app.listen(config.port, () => {
    console.log(`server is runnig on port ${config.port}`);
})