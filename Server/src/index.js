const http = require('http');
const getCharById = require('./controllers/getCharById.js');
const PORT = 3001;

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      const { url } = req;

      if (url.includes('/rickandmorty/character/')) {
        const id = url.split('/').at(-1);
        getCharById(res, id);
      }
    } catch (error) {
      throw new Error(error);
    }
  })

  .listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
