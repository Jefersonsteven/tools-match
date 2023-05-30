import transporter from "..";
import findUser from "../findUser";

export default async function desbaneo(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email } = req.body;
    try {
      await findUser(email)
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Reestablecimiento de cuenta",
        html: `
          <p style="color: black"> 
            Estimado usuario, <br>
            ¡Es un placer comunicarnos contigo! 
            Nos complace informarte que hemos revisado tu caso y hemos decidido levantar el baneo de tu cuenta en nuestra plataforma. 
            A partir de ahora, tendrás pleno acceso y podrás utilizar todos los servicios y funciones como antes. <br>
            Entendemos que las circunstancias que llevaron al baneo pueden haber sido complicadas, 
            pero creemos en brindar a nuestros usuarios la oportunidad de aprender de sus errores y mejorar en su participación dentro de nuestra comunidad. <br>
            Te recordamos que es importante cumplir con nuestros términos y condiciones para garantizar un entorno seguro y respetuoso para todos los usuarios. 
            Te instamos a tener en cuenta estas pautas y a seguir contribuyendo de manera positiva a nuestra plataforma. <br>
            Si tienes alguna pregunta adicional o necesitas aclaraciones sobre el levantamiento del baneo, no dudes en comunicarte con nuestro equipo de soporte. 
            Estaremos encantados de ayudarte en todo lo que necesites. <br>
            Agradecemos tu comprensión y cooperación durante este proceso. 
            Valoramos tu participación en nuestra comunidad y esperamos que disfrutes nuevamente de todos los beneficios que ofrece nuestra plataforma. <br>
            <b> ¡Te damos la bienvenida de vuelta! </b>
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
