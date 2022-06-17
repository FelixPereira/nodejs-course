const EventEmitter = require('events');

let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
  
    this.emit('connect', {message: 'You are loggedin'});
  }
};

module.exports = Logger;