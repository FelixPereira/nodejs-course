const mongoose = require('mongoose');

mongoose
  .connect('mogngodb://localhost/playgroundbd')
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
const nodeCouuse = new Course({
  name: 'NodeJS',
  author: 'Félix',
  tags: ['js', 'node'],
  isPublished: true
});
