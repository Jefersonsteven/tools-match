import transporter from "..";
import findUser from "../findUser";

export default async function desbaneo(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      const user = await findUser(email);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Desbaneo",
        html: `
          <p style="color: black"> 
            Estimado usuario, has sido desbaneado de la aplicación, puedes ingresar con su cuenta. <br>
            Le pedimos que cumplas con los términos y condiciones de la aplicación.
          </p>
          <h4 style="color: black">
            Atentamente, el equipo de ToolMatch
          </h4>
            `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un correo electrónico a ${email} `,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
