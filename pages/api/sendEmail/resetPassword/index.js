import transporter from "..";
import findUser from "../findUser";

export default async function resetPassword(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APLICATION,
        to: email,
        subject: "Recuperación de contraseña",
        html: `
        <p style="color: black">
          Estimado usuario, <br>
          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en ToolMatch. 
          Entendemos lo importante que es acceder a tu cuenta, por lo que estamos aquí para ayudarte a recuperar el acceso. <br>
          Para restablecer tu contraseña, ingresa al link proporcionado por el siguiente botón:
        </p>
        <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black">
          <a href=${
            process.env.DEPLOY_BACK
          }/form/resetPassword/${encodeURIComponent(
          email
        )} style="text-decoration: none; color: black">
            Recuperar contraseña
          </a>   
        </button>
        <p style="color: black">
          Si sigues experimentando problemas para acceder a tu cuenta o tienes alguna otra pregunta, no dudes en contactar a nuestro equipo de soporte. 
          Estamos aquí para asistirte y asegurarnos de que puedas acceder a tu cuenta de manera segura. <br>
          Agradecemos tu comprensión y cooperación en este asunto. 
          Valoramos tu confianza y nos comprometemos a brindarte un entorno seguro y protegido.
        </p>
        <h4 style="color: black">
          Atentamente, el equipo de ToolMatch
        </h4>
        `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un correo electrónico a ${email} para restablecer su contraseña`,
      });
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
}
