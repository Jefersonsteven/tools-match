import transporter from "..";
import findUser from "../findUser";

export default async function reviews(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APLICATION,
        to: email,
        subject: "Nuevas reseñas",
        html: `
          <p style="color: black">
            Estimado usuario, <br>
            Nos complace informarte que has recibido una reseña en nuestra plataforma sobre tu producto. 
            Queremos expresarte nuestro agradecimiento por brindar un excelente servicio y por ofrecer un producto que ha generado una experiencia positiva para el cliente. <br>
            En tu perfil podrás visualizar las reseñas recibidas.
          </p>
          <h4 style="color: black">
            Atentamente, el equipo de ToolMatch
          </h4>
        `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un coorreo electrónico a ${email} sobre reseñas en su producto`,
      });
    } catch (error) {
      res.status(400).json({ Error: error });
    }
  }
}
