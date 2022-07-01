const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const error = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);

  if(!customer || !movie) res.status(404).send('Invalid movie or customer');

  let newRental = new Rental({
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    }
  });

  newRental = await newRental.save();

  movie.numberInStock--;
  movie.save();
  
  res.send(newRental);
});

router.put('/:rentalId', async (req, res) => {
  const error = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(re.body.movieId);

  if(!customer || !movie) res.status(404).send('Invalid movie or customer');

  const rental = await Rental.findByIdAndUpdate(req.params.rentalId, {
    $set: {
      movie: {
        _id: movie._id,
        title: movie.title
      },
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        idGold: customer.isGold
      },
      price: req.body.price
    }
  }, { new: true });

  res.send(rental);
});

router.delete('/:rentalId', async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.rentalId);
  res.send(rental);
});

router.get('/:rentalId', async (req, res) => {
  const rental = await Rental.findById(req.params.rentalId);
  res.send(rental);
});

module.exports = router;

