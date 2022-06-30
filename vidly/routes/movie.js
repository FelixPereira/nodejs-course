const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.post('/add-movie', async (req, res) => {
  const error = validate(req.body);
  if(error) res.status(400).send('Invalida data');

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) res.status(404).send('Genre does not exist');

  let newMovie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  newMovie = await newMovie.save();
  res.send(newMovie);
});

router.put('/movieId', async (req, res) => {
  const id = req.params.movieId;
  const movie = await Movie.findByIdAndUpdate(id, {
    $set:{
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }
  }, { new: true });

  res.send(movie);
});

router.delete('/movieId', async (req, res) => {
  const id = req.params.movieId;
  const movie = await Movie.findByIdAndRemove(id);
  res.send(movie);
});

router.get('/movieId', async (req, res) => {
  const id = req.params.movieId;
  const movie = await Movie.findById(id);
  res.send(movie);
});