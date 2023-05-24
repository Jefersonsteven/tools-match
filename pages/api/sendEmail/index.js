import nodemailer from "nodemailer";
import mail from "./mail";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_APLICATION,
    pass: process.env.PASSWORD_APLICATION,
  },
});

transporter.verify().then(() => {
  console.log("Listo para enviar correos electrónicos");
});

export default async function handler(req, res) {
  const { method } = req;
  const { caseEmail, emailUser, password } = req.body;
  if (method === "POST") {
    try {
      const send = mail(caseEmail, "Credenciales de acceso", emailUser, password);
      await transporter.sendMail(send);
      console.log("Correo electrónico enviado");
      res.status(200).json({
        message: "El correo electrónico fue enviado correctamente",
      });
    } catch (error) {
      res.status(500).json({ error: "Error al enviar el correo electrónico" });
    }
  } else {
    res.status(405).json({ message: "Método HTTP no permitido" });
  }
}
