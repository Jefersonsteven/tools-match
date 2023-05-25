import transporter from "..";
import findUser from "../findUser";

export default async function registerUserEmail(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      const user = await findUser(email);
      if (user) {
        await transporter.verify();
        const mail = {
          from: process.env.USER_APPLICATION,
          to: email,
          subject: "Terminos y condiciones",
          html: `
          <p style="color: black"> 
            Usted ha aceptado los terminos y condiciones de tooltMatch y por ende los términos y condiciones de Mercadopago 
          </p>
            `,
        };
        await transporter.sendMail(mail);
        res.status(200).json({
          Alert: `Se ha enviado un correo electrónico a ${email} `,
        });
      }
      throw new Error("El usuario no existe");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
