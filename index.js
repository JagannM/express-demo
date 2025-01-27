const express = require('express');
const app = express();

app.use(express.json()); 

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

/* app.set('title','Hello');
var title = app.get('title');
console.log(title); */

/* app.get('/',(req,res)=>{
    res.send('Hello World!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send(['a','b','c']);
});

app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
}) */

    /*  app.get('/api/courses/:id',(req,res)=>{
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course) res.status(404).send("The course with the given ID is not found");
        res.send(course);
    }) */

app.post('/api/courses',(req,res)=>{
const course = {
    id: courses.length + 1,
    name: req.body.name
};

courses.push(course);
res.send(course);
});




//app.listen(3000,()=>{console.log('Listening on port 3000')});

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}...`)});