const winston = require('winston');

module.exports = function() {
  winston.add(new winston.transports.File({filename: 'logExceptions.log'}));
  winston.exceptions.handle(
    new winston.transports.File({filename: 'logExceptions.log'})
  );
};