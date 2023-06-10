const http = require('http');
const DATA = require('./utils/data.js');
const PORT = 3001;

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url === '/rickandmorty/character') {
      const urlSpliteada = req.url.split(':');
      const idSolicitado = Number(urlSpliteada[1]);
      console.log(id);
      if (DATA[id] === idSolicitado) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(DATA);
      } else {
        res.writeHead(400, { 'Content-Type': 'Text/Plain' });
        res.end('json not found');
      }
      return;
    }
  })
  .listen(PORT, 'localhost');
