const { User } = require("../../DB_connection");
const { isValidEmail, isValidPassword } = require("../utils/validations");

async function postUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw Error("Faltan datos");
    if (!isValidEmail(email) || !isValidPassword(password)) {
      throw Error("El correo o la contraseña no cumplen con los requisitos");
    } else {
      const [user, created] = await User.findOrCreate({
        where: { email: email.toLowerCase() },
        defaults: { password: password },
      });
      if (created) res.json(user);
      else throw Error("ya existe un usuario registrado con este correo");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = postUser;
