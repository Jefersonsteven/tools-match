import transporter from "..";
import findUser from "../findUser";

export default async function reviews(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, url } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APLICATION,
        to: email,
        subject: "Nuevas reseñas",
        html: `
          <p style="color: black">
            Ha recibido una reseña de su producto, héchale un vistazo. 
          </p>
          <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black">
            <a href=${url} style="text-decoration: none; color: black">
              Producto 
            </a>
          </button>
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
      console.log(error);
      res.status(400).json({ Error: error });
    }
  }
}
