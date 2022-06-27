const mongoose = require('mongoose');
const router = require('./exercise');


mongoose
  .connect('mongodb://localhost/playground2')
  .then(() => console.log('Connected to mongobd'))
  .catch(error => console.log('Could not connect to mongo db'));

app.use('/api/exercise', router);

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  category: {
    type: String,
    enum: ['web', 'mobile', 'netword']
  },
  tags: {
    type: Array, 
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Should hava at least one tag'
    }
  },
  date: {type: Date, default: Date.now},
  isPublished: Boolean,
  price: {
    type: Number,
    get: v => v + '$'
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const nodeCourse = new Course({
    name: 'AngularJS',
    author: 'Félix',
    category: 'web',
    tags: ['frontened'],
    isPublished: true,
    price: 40
  });
  
  try {
    const result = await nodeCourse.save();
    console.log(result);
  } catch(error) {
    for(field in error.errors) {
      console.log(error.errors[field].message);
    }
  }
};

async function getCourses(id) {
  const courses = await Course
    // .find({name: 'NodeJS'})
    .find({_id: id})
    // .limit(10)
    // .sort({name: -1})
    // .count()
    .select({price: 1})
  console.log(courses[0].price);
}

// getCourses('62b8442714cdf461b80fe0ce');
// createCourse();


