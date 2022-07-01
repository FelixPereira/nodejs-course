const mongoose = require('mongoose');

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

module.exports.Customer = mongoose.model('Customer', customerSchema);
module.exports.customerSchema = customerSchema;