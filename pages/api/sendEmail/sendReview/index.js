import transporter from "..";
import findUser from "../findUser";

export default async function sendReview(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, url } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Deja una reseña",
        html: `
          <p style="color: black"> Recientemente realizó una compra, dejale una reseña al producto </p>
          <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black"> 
            <a href=${url} style="text-decoration: none; color: black">
                Producto 
            </a>
          </button>
            `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un correo a ${email}`,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
