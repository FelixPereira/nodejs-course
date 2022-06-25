const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongobd'))
  .catch(error => console.log('Could not connect to mongo db'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean
});




const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const nodeCourse = new Course({
    name: 'AngularJS',
    author: 'Félix',
    tags: ['js', 'front-end', 'angularjs'],
    isPublished: true
  });
  
  const result = await nodeCourse.save();
  console.log(result);
};

async function getCourses() {
  const courses = await Course
    // .find({name: 'NodeJS'})
    .find()
    .limit(10)
    .sort({name: -1})
    .count();
  console.log(courses);
}

getCourses();
// createCourse();
