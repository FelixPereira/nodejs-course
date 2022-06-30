const config =  require('config');
const express = require('express');
const genres = require('./routes/genre');
const customers = require('./routes/customer');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extendend: true}));
app.use(express.static('public'));

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to mongoDB'))
  .catch(error => console.log('Failed to connect'));


// Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});