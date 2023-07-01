let favorites = [];

const postFav = (req, res) => {
  favorites.push(req.body);
  return res.json(favorites);
};

const deleteFav = (req, res) => {
  const { id } = req.params;
  const filtered = favorites.filter((fav) => Number(fav.id) !== Number(id));
  favorites = filtered;
  return res.json(favorites);
};

module.exports = { postFav, deleteFav };
