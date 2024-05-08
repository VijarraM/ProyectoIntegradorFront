function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Requisitos de la contraseña
  const minLength = 8; // Longitud mínima
  const maxLength = 30; // Longitud máxima

  // Expresión regular para validar la contraseña
  const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${minLength},${maxLength}}$`);

  return passwordRegex.test(password);
}

module.exports = {
  isValidEmail,
  isValidPassword,
};
