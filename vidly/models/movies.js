const mongoose = require('mongoose');
const genreSchema = require('./genres');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Movie', movieSchema);
