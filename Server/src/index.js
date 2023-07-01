//Con express

const PORT = 3001;
const express = require('express');
const router = require('./routes/index');
const server = express();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use(express.json());
server.use('/rickandmorty', router);

server.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});

// Sin express

// const http = require('http');
// const getCharById = require('./controllers/getCharById.js');
// const PORT = 3001;

// http
//   .createServer((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     try {
//       const { url } = req;

//       if (url.includes('/rickandmorty/character/')) {
//         const id = url.split('/').at(-1);
//         getCharById(res, id);
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   })

//   .listen(PORT, () => {
//     console.log(`Server on port ${PORT}`);
//   });
