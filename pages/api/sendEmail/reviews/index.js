import transporter from "..";

export default async function resetPassword(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await transporter.verify();
      const mail = {
        from: process.env.USER_APLICATION,
        to: email,
        subject: 'Nuevas reseñas',
        html: `
          <p style="color: black">
            Se han publicado nuevas reseñas de tus productos de interés, haz click sobre el botón para ver las más recientes. 
          </p>
          <h4 style="color: black">
            Atentamente, el equipo de ToolMatch
          </h4>
        `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Alert: `Se ha enviado un coorreo electrónico a ${email} sobre reseñas en los productos de interés`,
      });
    } catch (error) {
      console.log(error)
      res.status(400).json({ Error: error });
    }
  }
}