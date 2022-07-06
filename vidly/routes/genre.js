const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');


router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  } catch(error) {
    console.log('Could not find genres');
  }
});

router.post('/', async (req, res) => {
  const genre = new Genre({
    name: req.body.name
  });

  try {
    const savedGenre = await genre.save();
    res.send(savedGenre);
  } catch(error) {
    console.log('Could not add new genre');
  }
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const genre = await Course.findById(id);
    if(!genre) return res.status(404).send('Este género não existe');
    
    genre.name = req.body.name;
    res.send(genre);
  } catch(error) {
    console.log('Could upadate this genre.');
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const genre = await Course.findById(id);
    if(!genre) {
      return res.status(404).send('O genero não existe');
    }

    const deletedGenre = await Course.findByIdAndRemove(id);
    res.send(deletedGenre);
  } catch(error) {
    console.log('Could not proceed this operation.')
  }
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const genre = await Course.findById(id);

    if(!genre) return res.status(404).send('The genre with the given id does not exist!');

    res.send(genre);
  } catch(error) {
    console.log('Could not find this genre');
  }
});

module.exports = router;