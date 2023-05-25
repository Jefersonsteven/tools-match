import transporter from "..";
import findUser from "../findUser";

export default async function deletePost(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { email, date, buyer, items, amount } = req.body;
    try {
    //   const user = await findUser(email);
    //   if (!user) {
    //     throw new Error("El usuario no existe");
    //   }
      const productsList = items.map((item) => `
        <li>
            <p>
                <b>Título: </b>${item.title}
            </p>
            <p>
                <b>Precio: </b>${item.price}
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
            Se ha realiado la compra de algún producto publicado por usted, el detalle de la compra son: <br>
            <b>Fecha: </b> ${date} <br>
            <b>Comprador: </b> ${buyer.name} ${buyer.lastName}<br>
            <b>Productos: </b> <ul> ${productsList} </ul>
            <b>Costo total: </b> ${amount}
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