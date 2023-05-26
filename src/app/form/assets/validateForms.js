const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /^(?=.*[0-9]).{6,64}$/;
const notNumbers = /^[A-Za-z]+$/;

/* Validate login data */

export function validateLogIn(inputs) {
  const errors = {
    email: "Email correcto ✔️",

    flag: false,
  };

  if (!emailRegex.test(inputs.email)) {
    errors.email = "Email incorrecto";
    errors.flag = true;
  }

  !inputs.email && (errors.email = "");

  return errors;
}

/* Validate sign in data */

export function validateSignIn(inputs) {
  const errors = {
    name: "válido✔️",
    surname: "válido✔️",
    email: "Email válido ✔️",
    password: "Contraseña válida ✔️",
    passwordRepeat: "Las constraseñas coinciden ✔️",
    phoneNumber: "Celular válido ✔️",
    flag: false,
  };

  if (!notNumbers.test(inputs.name)) {
    errors.name = "Inválido";
    errors.flag = true;
  }

  if (!inputs.name) {
    errors.name = "";
    errors.flag = true;
  }

  if (!notNumbers.test(inputs.surname)) {
    errors.surname = "Inválido";
    errors.flag = true;
  }

  if (!inputs.surname) {
    errors.surname = "";
    errors.flag = true;
  }

  if (!emailRegex.test(inputs.email)) {
    errors.email = "Email inválido";
    errors.flag = true;
  }

  !inputs.email && (errors.email = "");

  if (!passwordRegex.test(inputs.password)) {
    errors.password = "Debe tener un número y al menos 6 caracteres ";
    errors.flag = true;
  }

  !inputs.password && (errors.password = "");

  if (inputs.passwordRepeat !== inputs.password) {
    errors.passwordRepeat = "Las contraseñas no coinciden";
    errors.flag = true;
  }

  !inputs.passwordRepeat && (errors.passwordRepeat = "");

  (inputs.phoneNumber.length < 8 || inputs.phoneNumber.length > 15) &&
    (errors.phoneNumber = "Número invalido");

  if (!inputs.phoneNumber) {
    errors.phoneNumber = "";
    errors.flag = true;
  }

  return errors;
}

export const validateEmailOnly = (email) => {
  let error = "";

  if (!emailRegex.test(email) && email.length > 0) {
    error = "Email inválido";
  }

  return error;
};

export const validatePasswords = (form) => {
  let errors = { flag: false };

  if (!form.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida";
    errors.flag = true;
  }
  if (!form.confirmNewPassword) {
    errors.confirmNewPassword = "La confirmación es requerida";
    errors.flag = true;
  }
  if (form.newPassword !== form.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden";
    errors.flag = true;
  }
  if (!passwordRegex.test(form.newPassword)) {
    errors.newPassword =
      "La contraseña debe tener al menos 6 caracteres y al menos un número";
    errors.flag = true;
  }

  return errors;
};
