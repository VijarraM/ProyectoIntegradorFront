const validation = (inputs) => {
  // const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  let errors = {};

  if (!inputs.email.includes("@" && ".com")) {
    errors.e1 = "El nombre de usuario tiene que ser un email.";
  }
  if (!inputs.email) {
    errors.e2 = "El email no puede estar vacío.";
  }
  if (inputs.email.length > 35) {
    errors.e3 = "El email no puede tener más de 35 caracteres.";
  }
  if (!/.*\d+.*/.test(inputs.password)) {
    errors.p1 = "La contraseña tiene que tener al menos un número.";
  }
  if (inputs.password.length < 6 || inputs.password.length > 10) {
    errors.p2 =
      "la contraseña tiene que tener una longitud entre 6 y 10 caracteres.";
  }
  return errors;
};

export default validation;
