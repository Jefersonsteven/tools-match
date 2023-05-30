import transporter from "..";
import findUser from "../findUser";

export default async function terminosCondiciones(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Terminos y condiciones",
        html: `
          <p style="color: black"> 
          ¡Gracias por aceptar nuestros términos y condiciones! 
          Queremos informarte que hemos registrado tu aceptación y estás oficialmente autorizado/a para utilizar nuestros servicios 
          y acceder a todas las funciones de nuestra plataforma. <br>
          Nuestros términos y condiciones son fundamentales para garantizar un entorno seguro y justo para todos los usuarios. 
          Al aceptarlos, te comprometes a cumplir con las políticas y directrices establecidas, 
          lo cual nos permite brindarte una experiencia positiva y proteger tus derechos y privacidad. <br>
          Esperamos que disfrutes de todos los beneficios y servicios que nuestra plataforma tiene para ofrecerte.
          </p>
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
