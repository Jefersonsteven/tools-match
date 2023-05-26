import transporter from "..";
import findUser from "../findUser";

export default async function baneo(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, motivo } = req.body;
    try {
      await findUser(email)
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Baneo",
        html: `
          <p style="color: black"> 
            Estimado usuario, has sido baneado de la aplicacion por incumplimiento de los terminos y condiciones. <br>
            Se le notidicará vía mail cuando sea desbaneado y puedas utilizar la aplicación nuevamente. <br>
            <b> Motivo: </b> ${motivo}
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
