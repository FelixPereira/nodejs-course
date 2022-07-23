const winston = require('winston');
require('express-async-errors');

module.exports = function() {
  winston.add(new winston.transports.File({filename: 'logExceptions.log'}));
  winston.exceptions.handle(
    new winston.transports.File({filename: 'logExceptions.log'}),
    new winston.transports.Console({colorize: true, prettyPrint: true})
  );
};