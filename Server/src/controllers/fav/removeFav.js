const { Favorite } = require('../../../DB_connection');
const favorite = require('../../models/favorite');

const removeFav = async (req, res) => {
  const id = req.query.id;
  try {
    const characterRemove = await Favorite.destroy({
      where: { id: id },
    });
    if (characterRemove) {
      const Id = Number(id);
      res.status(200).json({ message: 'personaje eliminado', id: Id });
    } else {
      res.status(404).json('no se encontró el personaje solicitado');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = removeFav;
