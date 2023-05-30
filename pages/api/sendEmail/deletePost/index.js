import transporter from "..";
import findUser from "../findUser";

export default async function deletePost(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, title } = req.body;
    try {
      await findUser(email)
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Publicación eliminada",
        html: `
          <p style="color: black"> 
            Estimado usuario, <br> 
            Espero que este mensaje te encuentre bien. 
            Lamentamos informarte que hemos tomado la decisión de eliminar una de tus publicaciones en nuestra plataforma 
            <b>por incumplimento de los terminos y condiciones</b>.<br>
            La publicación que se ha eliminado de su perfíl es: <b> ${title} </b>
          </p>
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
