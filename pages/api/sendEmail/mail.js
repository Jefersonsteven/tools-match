import registerUserEmail from "./registerUser";
import resetPassword from "./resetPassword";

export default function mail(caseEmail, subject, emailUser, password) {
  const emailUser = emailUser;
  switch (caseEmail) {
    case "Registro":
      return configEmail(emailUser, subject, registerUserEmail, emailUser, password);
    case "Recuperar contraseña":
      return configEmail(emailUser, subject, resetPassword);
    default:
      break;
  }
}

function configEmail(toEmailUser, subject, callback, ...callbackArgs) {
  return {
    from: process.env.USER_APLICATION,
    to: toEmailUser,
    subject,
    // text: `Estimado usuario, sus credenciales de acceso a ToolMatch son las siguientes: \n\nUsuario: ${email}\nContraseña: ${password}\n\nAtentamente,\nEl equipo de ToolMatch`,
    html: callback(...callbackArgs)
  };
}
