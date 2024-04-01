const express = require('express')
const router = express.Router();



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

router.get('/', (req, res) => {
    res.render('index', {
        title: "My express app",
        message: "Hello"
    })
    // res.send('Hello world');
})

router.get('/', (req, res) => {
    res.send(courses)
    // res.send([1, 2, 3]);
})

router.get('/:id', (req, res) => {
    const course = courses.find((c => c.id === parseInt(req.params.id)))
    if (!course) return res.status(404).send('The course was not found')
    res.send(course)
    // res.send(req.params.id);
})


router.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params)
    res.send(req.query);
})
// app.get('/api/posts/:year/:month', (req, res) => {
//     // res.send(req.params)
//     res.send(req.query);
// })

router.put('/:id', (req, res) => {
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




router.post('/', (req, res) => {
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


router.delete('/:id', (req, res) => {
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


module.exports = router;