import transporter from "..";
import findUser from "../findUser";

export default async function sendReview(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, url } = req.body;
    try {
      await findUser(email);
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Deja una reseña",
        html: `
          <p style="color: black"> 
            Esperamos que estés disfrutando de tu compra/arriendo en ToolMatch. 
            Queremos recordarte la importancia de tu opinión y te animamos a dejar una reseña sobre el producto que adquiriste. <br>
            Las reseñas son valiosas para nosotros y para otros clientes potenciales. 
            Compartir tu experiencia nos ayuda a mejorar nuestros productos y servicios, 
            y permite a otros usuarios tomar decisiones informadas al realizar compras/arriendos en nuestra web. <br>
            Si has tenido una experiencia positiva con tu compra, nos encantaría que compartas tus comentarios y nos cuentes qué te gustó del producto. 
            Si, por el contrario, has enfrentado algún desafío o tienes alguna preocupación, 
            también nos gustaría saberlo para poder abordar cualquier problema y garantizar tu satisfacción. <br>
            Agradecemos tu participación y tus comentarios.
          </p>
          <button style="border: 5px, black, solid; border-radius: 20px; background: white; color: black"> 
            <a href=${url} style="text-decoration: none; color: black">
                Perfil 
            </a>
          </button>
            `,
      };
      await transporter.sendMail(mail);
      res.status(200).json({
        Message: `Se ha enviado un correo a ${email}`,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
