const express = require('express');
const winston = require('winston');
const app = express();
const routes = require('./startup/routes');
const dbConnect = require('./startup/dbConnect');
const logErrors = require('./startup/logging');
const config = require('./startup/config');

logErrors();
routes(app);
dbConnect();
config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  winston.info(`Listening on port ${PORT}...`);
});