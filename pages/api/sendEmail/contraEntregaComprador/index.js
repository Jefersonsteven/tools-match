import transporter from "..";
import findUser from "../findUser";

export default async function deletePost(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, date, seller, items, amount } = req.body;
    try {
      await findUser(email);
      const productsList = items.map((item) => `
        <li>
            <p>
                <b>Título: </b>${item.title}
            </p>
            <p>
                <b>Precio: </b>$${item.price}
            </p>
        </li>
      `).join('');
      await transporter.verify();
      const mail = {
        from: process.env.USER_APPLICATION,
        to: email,
        subject: "Contra entrega",
        html: `
          <p style="color: black"> 
            Estimado usuario, usted ha seleccionado la opción de contra entrega, 
            te enviamos los datos del vendedor junto con el detalle de su compra. <br>
            <b>Fecha: </b> ${date} <br>
            <b>Vendedor: </b> ${seller.name} ${seller.lastName}<br>
            <b>Celular del vendedor: </b> ${seller.number}<br>
            <b>Productos: </b> <ul> ${productsList} </ul>
            <b>Costo total: </b> $${amount} <br>
            Por favor, comunícate directamente con la contraparte para coordinar los detalles adicionales de la entrega y el pago. 
            Recuerda que es importante mantener una comunicación clara y transparente para garantizar una transacción exitosa. <br>
            Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en comunicarte con nuestro equipo de soporte. 
            Estamos aquí para ayudarte en lo que necesites. <br>
            Agradecemos tu participación en nuestra plataforma y confiamos en que tendrás una experiencia satisfactoria al completar esta transacción.
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
