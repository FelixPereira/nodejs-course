const config =  require('config');
const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extendend: true}));
app.use(express.static('public'));

// Routes
app.use('/', home);
app.use('/api/genres', genres);





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});