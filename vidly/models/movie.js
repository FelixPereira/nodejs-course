const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 1,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 1,
  }
});

function validateGenre(genre) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  });

  return schema.validate(genre);
}; 

module.exports.Movie = mongoose.model('Movie', movieSchema);
module.exports.movieSchema = movieSchema;
module.exports.validate = validateGenre;
