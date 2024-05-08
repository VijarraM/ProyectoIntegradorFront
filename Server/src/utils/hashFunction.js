const bcrypt = require("bcrypt");

// Función para crear un hash de contraseña
async function hashPassword(password) {
  try {
    // Genera un salt aleatorio
    const saltRounds = 10; // Número de rondas de hashing
    const salt = await bcrypt.genSalt(saltRounds);

    // Hashea la contraseña utilizando el salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword.toString();
  } catch (error) {
    return password; // Manejar el error de manera apropiada en tu aplicación
  }
}

module.exports = hashPassword;
