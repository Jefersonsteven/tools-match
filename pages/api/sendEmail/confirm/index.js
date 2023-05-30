import transporter from "..";
import findUser from "../findUser";

export default async function confirm(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, id } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Confirmación de compra",
        html: `
          <p style="color: black"> 
          Estimado usuario, <br>
          ¡Gracias por tu reciente compra en ToolMatch! Estamos encantados de confirmar que tu transacción ha sido exitosa. <br>
          Queremos asegurarte que estamos trabajando arduamente para procesar tu pedido y enviártelo a la brevedad posible. 
          Si hay algún problema o retraso inesperado, nos comunicaremos contigo de inmediato para brindarte una actualización. <br>
          Si tienes alguna pregunta o inquietud sobre tu compra, no dudes en contactarnos. 
          Nuestro equipo de atención al cliente está aquí para ayudarte y garantizar que tengas una experiencia de compra satisfactoria.<br>
          Una vez más, agradecemos tu confianza, esperamos poder atenderte nuevamente en el futuro. <br>
          ¡Que tengas un excelente día! <br>
          En tu perfil de ToolMatch encontrarás la orden de compra.
          </p>
          <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black; padding: 4px">
            <a href=${process.env.DEPLOY_BACK}/perfil/${id} style="color: black; text-decoration: none">
              Perfil
            </a>
          </button>
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
