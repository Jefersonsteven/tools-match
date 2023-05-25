import transporter from "..";
import findUser from "../findUser";

export default async function registerUserEmail(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, id } = req.body;
    try {
      const user = await findUser(email);
      if (user) {
        await transporter.verify();
        const mail = {
          from: process.env.USER_APPLICATION,
          to: email,
          subject: "Confirmación de compra",
          html: `
          <p style="color: black"> 
            La compra de su producto fue realizada exitosamente, el pago ya fue acreditado. <br>
            El producta ya esta listo para ser enviado. <br>
            Si quiere ver el detalle de su compra puedes ingresar en tu perfil o hacer click en el botón. 
          </p>
          <button style="border: 2px, solid, black; border-radius: 5px">
            <a href=${process.env.DEPLOY_BACK}/perfil/${id}>
              Pérfil
            </a>
          </button>
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