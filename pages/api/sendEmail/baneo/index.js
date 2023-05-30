import transporter from "..";
import findUser from "../findUser";

export default async function baneo(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email)
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Suspensión de cuenta",
        html: `
          <p style="color: black"> 
          Estimado usuario <br>
          Esperamos que este mensaje te encuentre bien. 
          Lamentamos informarte que hemos tomado la decisión de suspender tu cuenta en nuestro servicio. 
          Queremos asegurarnos de que estés completamente informado sobre esta medida y las razones detrás de ella. <br>
          <b> Motivo de la suspensión: </b> <br>
          Tras una revisión exhaustiva de tu cuenta y tu actividad en nuestra plataforma, 
          hemos identificado violaciones graves de nuestros términos de servicio. <br>
          <b> Consecuencias de la suspensión: </b> <br>
          Como resultado de estas violaciones, hemos decidido suspender tu cuenta de forma temporal, 
          comenzando desde la fecha de envío de este correo electrónico. 
          Durante este período, no podrás acceder a tu cuenta, utilizar nuestros servicios ni realizar ninguna acción relacionada con ella.
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
