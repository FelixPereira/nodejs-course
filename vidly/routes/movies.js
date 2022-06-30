const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.post('/add-movie', async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  })
})
