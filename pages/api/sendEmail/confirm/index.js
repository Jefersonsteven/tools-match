import transporter from "..";
import findUser from "../findUser";

export default async function confirm(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, id } = req.body;
    try {
      const user = await findUser(email);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Confirmación de compra",
        html: `
          <p style="color: black"> 
            La compra de su producto fue realizada exitosamente, el pago ya fue acreditado. <br>
            Si quiere ver el detalle de su compra puedes ingresar en tu perfil o hacer click en el botón. 
          </p>
          <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black; padding: 4px">
            <a href=${process.env.DEPLOY_BACK}/perfil/${id} style="color: black; text-decoration: none">
              Perfil
            </a>
          </button>
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
