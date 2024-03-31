const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger')
const express = require('express');
const config = require('config');
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(logger)
app.use(helmet());


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

const courses = [
    {
        id: 1, name: "courses1"
    },
    {
        id: 2, name: "courses2"
    },
    {
        id: 3, name: "courses3"
    },
]

app.get('/', (req, res) => {
    res.render('index', {
        title: "My express app",
        message: "Hello"
    })
    // res.send('Hello world');
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
    // res.send([1, 2, 3]);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c => c.id === parseInt(req.params.id)))
    if (!course) return res.status(404).send('The course was not found')
    res.send(course)
    // res.send(req.params.id);
})


app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params)
    res.send(req.query);
})
// app.get('/api/posts/:year/:month', (req, res) => {
//     // res.send(req.params)
//     res.send(req.query);
// })

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find((c => c.id === parseInt(req.params.id)))
    if (!course) {
        return res.status(404).send('The course was not found')
    }
    // Validate
    const result = validateCourse(req.body)
    const { error } = validateCourse(req.body)
    if (error) {
        return res.status(400).send(result.error.details[0].message)
    }
    // Update course
    course.name = req.body.name
    res.send(course)
})




app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((c => c.id === parseInt(req.params.id)))
    if (!course) return res.status(404).send('The course was not found')
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
})








function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course)
}





// PORT
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))
// app.post()
// app.put()
// app.delete()
