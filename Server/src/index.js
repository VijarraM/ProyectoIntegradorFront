const http = require('http');
const DATA = require('./utils/data.js');
const PORT = 3001;

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req;
    const urlSpliteada = url.split('/');
    const id = Number(urlSpliteada[3]);

    if (req.url === `/rickandmorty/character/${id}`) {
      const character = DATA.find((char) => char.id === id);
      if (character) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(character));
        console.log(character);
      } else {
        res.writeHead(400, { 'Content-Type': 'Text/Plain' });
        res.end('json not found');
      }
    }
  })
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
