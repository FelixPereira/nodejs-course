const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Comedy'},
  {id: 3, name: 'Drama'},
  {id: 4, name: 'Terror'},
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  const {error} = validateInput(req.body);
  if(error)  return res.status(404).send(error.details[0].message);
  
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const {error} = validateInput(req.body);
  if(error) return res.status(404).send(error.details[0].message);
  
  const id = parseInt(req.params.id);
  const genre = genres.find(genre => genre.id === id);
  
  if(!genre) return res.status(404).send('Este género não existe');
  
  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find(genre => genre.id === id);

  if(!genre) {
    return res.status(404).send('O genero não existe');
  }

  const idx = genres.findIndex(genre => genre.id === id);
  const deletedGenre = genres.splice(idx, 1);
  res.send(deletedGenre);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find(genre => genre.id === id);

  if(!genre) return res.status(404).send('The genre with the given id does not existe!');

  res.send(genre);
});

// Validation with JOI
function validateInput(inputToValidate) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(inputToValidate, schema);
};

module.exports = router;