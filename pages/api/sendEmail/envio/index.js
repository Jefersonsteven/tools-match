import transporter from "..";
import findUser from "../findUser";

export default async function envio(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Su producto está en camino",
        html: `
          <p style="color: black"> 
            Estimado usuario, <br>
            Nos complace informarte que tu producto ha sido despachado y está en camino hacia la dirección de envío que proporcionaste. <br>
            Si tienes alguna pregunta o inquietud sobre tu envío, no dudes en contactarnos. 
            Estamos aquí para ayudarte y asegurarnos de que recibas tu producto de manera segura y a tiempo. <br>
            Agradecemos tu paciencia y apoyo durante este proceso. 
            Estamos comprometidos a brindarte una excelente experiencia de compra y esperamos que disfrutes tu producto una vez que lo recibas.
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
