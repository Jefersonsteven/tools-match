import transporter from "..";

export default async function registerUserEmail(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, subject, password } = req.body;
    try {
      await transporter.verify();
      const mail = {
        from: process.env.USER_APLICATION,
        to: email,
        subject: 'Registro exitoso',
        html: `
          <p>Estimado usuario, sus credenciales de acceso a ToolMatch son las siguientes: <br>
             Usuario: ${email} <br>
             Contraseña: ${password} <br>
             Atentamente, el equipo de ToolMatch
          </p>
        `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Alert: `Se ha enviado un coorreo electrónico a ${email} con sus credenciales de acceso a TooltMatch`,
      });
    } catch (error) {
      res.status(400).json({ Error: error });
    }
  }
}
