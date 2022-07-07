const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlingth: 6,
    maxlength: 1024
  }
});

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).required(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(user);
}

module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;