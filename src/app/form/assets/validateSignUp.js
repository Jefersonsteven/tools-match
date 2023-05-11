export function validate(inputs) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = /^(?=.*[0-9]).{6,64}$/;
  const notNumbers = /^[A-Za-z]+$/;

  const errors = {
    name: "✔️",
    surname: "✔️",
    email: "Email válido ✔️",
    password: "Contraseña válida ✔️",
    phoneNumber: "✔️",
    flag: false,
  };

  if (!notNumbers.test(inputs.name)) {
    errors.name = "No se admiten números o caracteres especiales";
  }

  if (!inputs.name) {
    errors.name = "Campo requerido";
  }

  if (!notNumbers.test(inputs.surname)) {
    errors.surname = "No se admiten números o caracteres especiales";
  }

  if (!inputs.surname) {
    errors.surname = "Campo requerido";
  }

  if (!emailRegex.test(inputs.email)) {
    errors.email = "Email inválido";
    errors.flag = true;
  }

  if (!inputs.email) {
    errors.email = "Campo requerido";
  }

  if (!passwordRegex.test(inputs.password)) {
    errors.password =
      "Tú contraseña debe contener un número y una longitud de al menos 6 caracteres *";
    errors.flag = true;
  }

  if (!inputs.password) {
    errors.password = "Campo requerido";
  }

  if (inputs.phoneNumber.length < 8 || inputs.phoneNumber.length > 15) {
    errors.phoneNumber = "Número invalido";
  }
  if (!inputs.phoneNumber) {
    errors.phoneNumber = "Campo requerido";
  }

  return errors;
}
