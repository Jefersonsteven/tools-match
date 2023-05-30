import transporter from "..";

export default async function register(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, password } = req.body;
    try {
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Registro exitoso",
        html: `
          <p style="color: black">
          Estimado usuario, <br>
          ¡Bienvenido/a a ToolMatch! Nos complace informarte que tu registro de cuenta ha sido exitoso y ahora eres un miembro activo de nuestra comunidad. <br>
          Te recordamos que es responsabilidad de cada usuario mantener la privacidad y seguridad de su cuenta. 
          Asegúrate de utilizar una contraseña segura y mantenerla confidencial. 
          Siempre recomendamos no compartir tus credenciales de inicio de sesión con terceros y 
          evitar acceder a tu cuenta desde dispositivos no confiables o redes Wi-Fi públicas. <br>
          Como nuevo miembro, tendrás acceso a todas las funciones y características que ofrecemos. 
          Explora nuestro sitio web y descubre todo lo que tenemos para ofrecerte. 
          No dudes en contactarnos si tienes alguna pregunta o necesitas asistencia en el uso de nuestras herramientas. <br>
          <b>¡Bienvenido nuevamente y que tengas una experiencia increíble en nuestra plataforma! </b> <br>
          Sus credenciales de acceso a la plataforma son: <br>
            <b> Correo: </b> ${email} <br>
            <b> Contraseña temporal: </b> ${password}
          </p>
          <h4 style="color: black">
            Atentamente, el equipo de ToolMatch
          </h4>
            `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un correo electrónico a ${email} con sus credenciales de acceso a ToolMatch`,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
