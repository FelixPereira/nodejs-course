const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
      telephone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12,
      },
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 1,
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 1
  }
});

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });

  return schema.validate(rental);
}

module.exports.Rental = mongoose.model('Rental', rentalSchema);
module.exports.validate = validateRental;