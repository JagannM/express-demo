const startUpDebugger = require("debug")("app:startUp");
const dbDebugger = require("debug")("app:db");

const config = require("config");
const Joi = require("joi");
const morgan = require("morgan");
const logger = require("./logger");
const courses = require("./routes/courses.js");
const express = require("express");
const { urlencoded } = require("body-parser");
const app = express();

//templating engine demo
app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("index", { title: "my app", message: "helloooo..." });
});

app.use(express.json()); //built-in middleware

app.use("/api/courses", courses);
app.use(logger); //custom middleware

//custom middleware
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

app.use(express.urlencoded({ extended: true })); //url parsing middleware (built-in)
app.use(express.static("public")); //to handle static files like images, etc (built-in)

console.log(`NODE_ENV : ${process.env.NODE_ENV}`); //to check the app environment
console.log(`APP : ${app.get("env")}`); //to check the app environment

//app environment checking  //app.use(morgan('tiny'));  //third party middleware
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //console.log('Morgan enabled...');
  startUpDebugger("MorganEnabled...");
}

//dbDebugger
dbDebugger("Database connected");

//configuration
console.log("Application name : " + config.get("name"));
console.log("Mail Server : " + config.get("mail.host"));
console.log("Mail Password : " + config.get("mail.password"));

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

//app.listen(3000,()=>{console.log('Listening on port 3000')});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
