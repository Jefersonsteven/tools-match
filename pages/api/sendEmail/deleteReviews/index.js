import transporter from "..";
import findUser from "../findUser";

export default async function deleteReviews(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APLICATION,
        to: email,
        subject: "Reseña eliminada",
        html: `
          <p style="color: black">
            Estimado usuario, <br> 
            Espero que este mensaje te encuentre bien. 
            Lamentamos informarte que hemos tomado la decisión de eliminar una de tus reseñas publicadas en nuestra plataforma debido a que encontramos un
            <b> incumplimento de los terminos y condiciones</b> establecidos.<br>
          </p>
          <h4 style="color: black">
            Atentamente, el equipo de ToolMatch
          </h4>
        `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Correo enviado a ${email} sobre reseña eliminada`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ Error: error.message });
    }
  }
}
