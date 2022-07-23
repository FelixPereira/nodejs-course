const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const genres = require('./routes/genre');
const customers = require('./routes/customer');
const movies = require('./routes/movie');
const rentals = require('./routes/rental');
const users = require('./routes/user');
const auth = require('./routes/auth');
const error = require('./middleware/error');

/*
  if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }
*/

process.on('uncaughtException', ex => {
  console.log(ex);
});

app.use(express.json());
app.use(express.urlencoded({extendend: true}));
app.use(express.static('public'));

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to mongoDB'))
  .catch(error => console.log(error.message));

// throw new Error('Something failed on startup.');

// Routes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});