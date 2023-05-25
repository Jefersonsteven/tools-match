import transporter from "..";
import findUser from "../findUser";

export default async function resetPassword(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      const user = await findUser(email);
      if (user) {
        await transporter.verify();
        const mail = {
          from: process.env.USER_APLICATION,
          to: email,
          subject: "Nuevos productos",
          html: `
              <p style="color: black">
              Se han publicado nuevos productos que te podrían interesar, visita nuestra web. 
              </p>
              <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black">
              <a href=${process.env.DEPLOY_BACK}/home style="text-decoration: none; color: black">
              ToolMatch
              </a>   
              </button>
              <h4 style="color: black">
              Atentamente, el equipo de ToolMatch
              </h4>
        `,
        };
        await transporter.sendMail(mail);
        res.status(200).json({
          Alert: `Se ha enviado un coorreo electrónico a ${email} sobre nuevos productos`,
        });
      }
      throw new Error("Usuario no existe");
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
}
