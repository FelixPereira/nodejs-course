const express = require('express');
require('express-async-errors');

const app = express();
const routes = require('./startup/routes');
const dbConnect = require('./startup/dbConnect');
const logErrors = require('./logging');

dbConnect();
routes(app);
logErrors();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});