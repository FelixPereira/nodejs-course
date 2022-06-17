// const path = require('path');
// const filename = path.parse(__filename);

// const os = require('os');
// const version = os.version();
// const freemem = os.freemem();
// console.log(version);

// const fs = require('fs');
// const files = fs.readdirSync('./');

// const fils = fs.readdir('./f', (error, files) => {
//  if(error) console.log('Error', error);
// else console.log('Files', files);
/* });

const Logger = require('./logger');
const logger = new Logger();

logger.on('connect', (message) => {
  console.log(message);
});

logger.log('message')

*/

const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.write('Olá, eu sou a homepage');
    res.end();
  }

  if(req.url === '/courses') {
    res.write('Ola, eu sou a pagina de cursos');
    res.end();
  }
});

server.listen(3000);