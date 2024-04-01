const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger')
const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require('express');
const config = require('config');
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(logger)
app.use(helmet());

app.use('/api/courses', courses)
app.use('/', home)

app.set('view engine', 'pug')
app.set('views', './views') // default

// Configuration
console.log("Aplication Name: " + config.get('name'));
// console.log("Mail server : " + config.get('mail.host'));
// console.log("Mail Password : " + config.get('mail.password'));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled ...');
}

// Db work ...
dbDebugger('Connected to the database ...')

// Add midleware fucntion
app.use(function (req, res, next) {
    console.log("Authenticated .... ");
    next();
})

// PORT
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))
// app.post()
// app.put()
// app.delete()
