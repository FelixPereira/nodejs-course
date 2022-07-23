const express = require('express');
const router = express.Router();

const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const asyncMiddleware = require('../middleware/async');


router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const genre = new Genre({
    name: req.body.name
  });

  const savedGenre = await genre.save();
  res.send(savedGenre);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const genre = await Genre.findById(id);
  if(!genre) return res.status(400).send('Invalid request.');

  try {
    genre.name = req.body.name;
    res.send(genre);
  } catch(error) {
    console.log('Could update this genre.');
  }
});

router.delete('/:id', [auth, authAdmin], async (req, res) => {
  const id = req.params.id;

  const genre = await Genre.findById(id);
  if(!genre) return res.status(400).send('Invalid request.');

  try {
    const deletedGenre = await Genre.findByIdAndRemove(id);
    res.send(deletedGenre);
  } catch(error) {
    console.log('Could not proceed this operation.')
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const genre = await Genre.findById(id);

    if(!genre) return res.status(404).send('The genre with the given id does not exist!');

    res.send(genre);
  } catch(error) {
    console.log('Could not find this genre');
  }
});

module.exports = router;