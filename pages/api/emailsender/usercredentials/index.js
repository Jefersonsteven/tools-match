import Mailgun from "mailgun-js";

export default async = (req, res) => {
  //en metodo post quiero enviar el email con las credenciales del usuario
  if (req.method === "POST") {
    const { email, password } = req.body;
    const mailgun = new Mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    const data = {
      from: "ToolMatch <toolmatchnotificaciones@gmail.com>",
      to: email,
      subject: "Credenciales de acceso a ToolMatch",
      text: `Estimado usuario, sus credenciales de acceso a ToolMatch son las siguientes: \n\nUsuario: ${email}\nContraseña: ${password}\n\nAtentamente,\nEl equipo de ToolMatch`,
    };

    mailgun.messages().send(data, (error, body) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: "Email sent successfully." });
      }
    });
  }
  //get de prueba
  else if (req.method === "GET") {
    res.status(200).json({ message: "Email sender API" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
