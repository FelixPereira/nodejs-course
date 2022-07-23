const winston = require('winston');

module.exports = (err, req, res, next) => {
  winston.error('ERROR');

  res.status(500).send(err.message);
}