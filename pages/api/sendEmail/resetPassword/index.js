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
        subject: "Restablecer contraseña",
        html: `
        <p style="color: black">
          Estimado usuario, usted solicito recuperar su contraseña, para realizar el cambio presiona el botón. 
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
