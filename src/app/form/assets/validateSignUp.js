export function validate(inputs) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = /^(?=.*[0-9]).{6,64}$/;

  const errors = {
    name: "",
    surname: "",
    email: "Email correcto ✔️",
    password: "Contraseña correcta ✔️",
    flag: false,
  };

  if (!emailRegex.test(inputs.email)) {
    errors.email = "Email incorrecto";
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

  return errors;
}
