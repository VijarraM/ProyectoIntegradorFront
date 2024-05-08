const { User } = require('../../DB_connection');
const bcrypt = require('bcrypt');

async function login(req, res) {
  try {
    const { email, password } = req.query;
    if (!email || !password) res.status(400).json('Faltan datos');
    else {
      const findUser = await User.findOne({ where: { email: email } });
      if (!findUser) res.status(404).json('Usuario no encontrado');
      else {
        const passwordCompared = await bcrypt.compare(password, findUser.password);
        if (passwordCompared) {
          res.json({
            access: true,
            user: findUser.id,
          });
        } else res.status(403).json('Contraseña incorrecta');
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = login;
