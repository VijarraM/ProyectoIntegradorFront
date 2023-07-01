//con express
const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

const getCharById = (req, res) => {
  const { id } = req.params;
  axios(`${URL}/${id}`)
    .then(({ data }) => {
      const { id, status, name, species, origin, image, gender, error } = data;
      const character = { id, status, name, species, origin, image, gender };
      return name
        ? res.json(character)
        : res.status(404).json({ message: error });
    })
    .catch((reason) => {
      return res.status(500).json({ message: reason });
    });
};

module.exports = getCharById;

//sin express

// const axios = require('axios');
// const URL = 'https://rickandmortyapi.com/api/character/';
// const getCharById = (res, id) => {
//   axios
//     .get(URL + id)
//     .then((response) => {
//       const { id, name, gender, species, origin, image, status } =
//         response.data;

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(
//         JSON.stringify({ id, name, gender, species, origin, image, status })
//       );
//     })
//     .catch((reason) => {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end(reason.message);
//     });
// };
// module.exports = getCharById;
