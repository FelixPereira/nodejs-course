const winston = require('winston');
require('winston-mongodb');

process.on('uncaughtException', ex => {
  console.log('ERROR: ', ex.message);
});