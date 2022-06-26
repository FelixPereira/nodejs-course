const mongoose = require('mongoose');
const joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50, 
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 12, 
  },
});

// Validation with JOI
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(3).max(12).required(),
    isGold: Joi.Boolean()
  }
  
  return Joi.validate(customer, schema);
};

module.exports.Customer = mongoose.model('Customer', customerSchema);
module.exports.validate = validateCustomer;