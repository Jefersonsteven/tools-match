import registerUserEmail from "./registerUser";
import resetPassword from "./resetPassword";

export default function mail(caseEmail, subject, emailUser, password) {
  const emailUser = emailUser;
  switch (caseEmail) {
    case "Registro":
      return configEmail(emailUser, subject, emailHtml, password, () => registerUserEmail(emailUser, password));
    case "Recuperar contraseña":
      return configEmail(emailUser, subject, resetPassword);
    default:
      break;
  }
}

function configEmail(toEmailUser, subject, callback) {
  return {
    from: process.env.USER_APLICATION,
    to: toEmailUser,
    subject,
    // text: `Estimado usuario, sus credenciales de acceso a ToolMatch son las siguientes: \n\nUsuario: ${email}\nContraseña: ${password}\n\nAtentamente,\nEl equipo de ToolMatch`,
    html: callback()
  };
}
