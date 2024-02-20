const express = require('express');
const app = express();

app.use(express.json());


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
    res.send('Hello world');
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
    // res.send([1, 2, 3]);
})

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find((c => c.id === parseInt(req.params.id)))
    if (!course) res.status(404).send('The course was not found')
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


app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);

})



// PORT
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))
// app.post()
// app.put()
// app.delete()
