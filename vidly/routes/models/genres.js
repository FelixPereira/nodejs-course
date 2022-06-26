const mongoose = require('mongoose');
const joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// Validation with JOI
function validateInput(inputToValidate) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(inputToValidate, schema);
};

module.exports.Genre = mongoose.model('Genre', genreSchema);
module.exports.validate = validateInput;
