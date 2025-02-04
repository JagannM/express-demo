const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const logger = require('./logger');
const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();


app.use(express.json()); //built-in middleware

app.use(logger); //custom middleware

//custom middleware
app.use(function (req,res,next){
    console.log("Authenticating...");
    next();
});

app.use(express.urlencoded ({extended:true})); //url parsing middleware (built-in)
app.use(express.static('public')); //to handle static files like images, etc (built-in)


console.log(`NODE_ENV : ${process.env.NODE_ENV}`); //to check the app environment
console.log(`APP : ${app.get('env')}`); //to check the app environment

//app environment checking  //app.use(morgan('tiny'));  //third party middleware
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

//configuration
console.log('Application name : ' +config.get('name'));
console.log('Mail Server : ' +config.get('mail.host'));
console.log('Mail Password : ' +config.get('mail.password'));

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

     app.get('/api/courses/:id',(req,res)=>{
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course) res.status(404).send("The course with the given ID is not found");
        res.send(course);
    })

app.post('/api/courses',(req,res)=>{

//basic input validation
//if(!req.body.name || req.body.name.length < 3){
//    res.status(400).send("Name is required and it should be minimum 3 characters"); // 400 Bad Request
//    return;
// }

/* //joi schema for the data object
const schema = Joi.object({
    name: Joi.string().min(3).required()
});
const result = schema.validate(req.body);
//console.log(result);
if (result.error){
    res.status(400).send(result.error.details[0].message);
    return;
}; */

const {error} = validateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    };

const course = {
    id: courses.length + 1,
    name: req.body.name
};

courses.push(course);
res.send(course);
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});


app.put('/api/courses/:id',(req,res) => {
    //Lookup the course and if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID is not found");

    //validate the course, if invalid, return 400

   // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    };

    //update the course
    course.name = req.body.name;

    //return the updated course
    res.send(course);
})


function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

app.delete('/api/courses/:id',(req,res) => {
    //lookout
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with the given ID is not found");
    //delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    //inform the client
    res.send(course);

})

//app.listen(3000,()=>{console.log('Listening on port 3000')});

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}...`)});