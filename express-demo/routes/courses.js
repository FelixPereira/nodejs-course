const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'}
]

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(course => course.id === id);
  if(!course) res.status(404).send('The course with the given id does not exist');
  res.send(course);
});

router.post('/', (req, res) =>  {
  const {error} = valideteInput(req.body);

  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  const {error} = valideteInput(req.body);

  const id = parseInt(req.params.id);
  const course = courses.find(course => course.id === id);

  if(error) {
    res.status(404).send(error.details[0].message);
    return;
  };

  course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(course => course.id === id);
  
  if(!course) {
    res.status(404).send('Este curso não existe');
    return;
  }
  
  const index = courses.findIndex(course => course.id === id);
  const deletedCourse = courses.splice(index, 1);
  res.send(deletedCourse);
});

function valideteInput(objectToValidate) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  const result = Joi.validate(objectToValidate, schema);
  return result;
}

module.exports = router;