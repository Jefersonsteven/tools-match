import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "toolmatchnotificaciones@gmail.com",
    pass: 'aizynurwqqgghagt',
  },
});

transporter.verify().then(() => {
  console.log("Listo para enviar correos electrónicos");
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        try {
          const mailOptions = {
            from: "toolmatchnotificaciones@gmail.com",
            to: "ema735959@gmail.com",
            subject: "Credenciales de acceso a ToolMatch",
            text: `Estimado usuario, sus credenciales de acceso a ToolMatch son las siguientes: \n\nUsuario: ${email}\nContraseña: ${password}\n\nAtentamente,\nEl equipo de ToolMatch`,
          };
    
          await transporter.sendMail(mailOptions);
          console.log("Correo electrónico enviado");
          res.status(200).json({ message: "El correo electrónico fue enviado correctamente xd 😍" });
        } catch (error) {
          console.error("Error al enviar el correo electrónico:", error);
          res.status(500).json({ error: "Error al enviar el correo electrónico" });
        }
      } else {
        res.status(405).json({ message: "Método HTTP no permitido" });
      }
}