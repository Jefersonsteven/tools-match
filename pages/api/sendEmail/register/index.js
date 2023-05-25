import transporter from "..";

export default async function register(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Registro exitoso",
        html: `
          <p style="color: black">
            Estimado usuario, su registro en ToolMatch ha sido exitosa, su correo para iniciar sesión es: <br>
            <b> Correo: </b> ${email} <br>
          </p>
          <h4 style="color: black">
            Atentamente, el equipo de ToolMatch
          </h4>
            `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un correo electrónico a ${email} con sus credenciales de acceso a ToolMatch`,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
