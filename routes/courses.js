const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID is not found");
  res.send(course);
});

router.post("/", (req, res) => {
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

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.get("/", (req, res) => {
  res.send(courses);
});

router.put("/:id", (req, res) => {
  //Lookup the course and if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID is not found");

  //validate the course, if invalid, return 400

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //update the course
  course.name = req.body.name;

  //return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

router.delete("/:id", (req, res) => {
  //lookout
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID is not found");
  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //inform the client
  res.send(course);
});

module.exports = router;
