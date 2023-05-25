
import transporter from "..";
import findUser from "../findUser";

export default async function registerUserEmail(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, url } = req.body;
    try {
      const user = await findUser(email)
      if (user) {
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
          Alert: `Se ha enviado un correo electrónico a ${email} con sus credenciales de acceso a ToolMatch`,
        });
      }
      throw new Error("El usuario no existe");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}