const mongoose = require('mongoose');
const router = require('express').Router();
const express = require('express');
const app = express();

app.use(express.json());


mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongoBD'))
  .catch((error) => console.log('Connectin failed'));

// COURSES SCHEMA
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  tags: [String],
  price: Number,
  date: {type: Date, default: Date.now}
});

const Course = mongoose.model('Course', courseSchema);

app.post('/api/resister', async (req, res) => {
  const course = new Course({
    name:req.body.name,
    author:req.body.author,
    isPublished:req.body.isPublished,
    price:req.body.price,
    tags:req.body.tags,
    date:req.body.date
  });
  
  const savedCourse = await course.save();
  res.send(savedCourse);
});

async function getCourses() {
  const courses = await Course
    .find()
    .or([{
      price: {$gte: 15},
    }, {name: /.*by.*/i}])
    .sort({price: -1})
    .select({name: 1, author: 1, price: 1});
  
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.updateMany({id}, {
    $set: {
      name: 'Express course updated',
      isPublished: false
    }
  });

  console.log(course);
}

app.listen(3000, () => console.log('Listening on port 3000'));

//updateCourse('62b77c44ab84008faf7de964');

