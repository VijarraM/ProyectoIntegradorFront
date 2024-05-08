const { Favorite } = require('../../../DB_connection');

async function postFav(req, res) {
  try {
    const { name, status, image, id, origin, species, gender } = req.body;
    // const origin = req.body.origin.name;
    // const id = req.body.id.toString();
    if (!id || !name || !origin || !status || !species || !gender) res.status(401).json('Faltan datos');
    else {
      const [character, created] = await Favorite.findOrCreate({
        where: { id: id },
        defaults: {
          name: name,
          origin: origin,
          status: status,
          image: image,
          species: species,
          gender: gender,
        },
      });
      res.json(req.body);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = postFav;
