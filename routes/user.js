const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
let users = require('./../users');


router.get('/', function (req, res) {
    res.status(200).json({
        data: users,
        success: true,
    });
})

router.get('/:id', function (req, res) {
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

router.post('/', [
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    users = users.filter((user) => {
        if (user.id != req.params.id) {
            return user;
        }
    })
    res.json({
        data: 'user is delete successfully'
    })
})



module.exports = router;