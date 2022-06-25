const mongoose = require('mongoose');

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

async function addCourse() {
  const course = new Course({
    name:"Angular Course",
    author:"Mosh",
    isPublished:true,
    price: 15,
    tags:["angular","frontend"],
    date: "2018-01-24T21:56:15.353Z"
  });
  
  const savedCourse = await course.save();
  console.log(savedCourse);
}


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

updateCourse('62b77c44ab84008faf7de964');