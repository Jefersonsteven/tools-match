import transporter from "..";
import findUser from "../findUser";

export default async function deletePost(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, title } = req.body;
    try {
      const user = await findUser(email);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Post eliminado",
        html: `
          <p style="color: black"> 
            Estimado usuario, se ha eliminado una publicación suya debido al incumplmiento de los terminos y condiciones. <br>
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
