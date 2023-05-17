const mercadopago = require("mercadopago");

// const MercadoPagoNoti = [];
// let payment = 1;

export default async function handler(req, res) {
  const URL_BASE = "http://localhost:3000";
  const { method } = req;
  if (method == "POST") {
    try {
      // const pago = `payment-${payment}`;
      // MercadoPagoNoti.push({ [pago]: response.body, Payer: response.body.additional_info.payer });
      // payment = payment + 1;

      // se guardaría en la base de datos el bojeto que cree con los detalles necesarios
      const response = await mercadopago.payment.get(req.body.data.id);
      const name = response.body.additional_info.payer.first_name;
      console.log(name);
      const responseUser = await fetch(`${URL_BASE}/api/user/${name}`);
      const user = await responseUser.json();
      if (user) {
        console.log(user.id);
        // await fetch(`${URL_BASE}/api/post`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     amount: response.body.total_paid_amount,
        //     curerncy: response.body.currency_id,
        //     userId: user.id
        //   })
        // });
      } else
        throw new Error("No se va a poder registrar su compra en el historial");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

//   if (method == "GET") {
//     res.status(200).json({ PagosRealizados: MercadoPagoNoti });
//   }
}

// DETALLE QUE QUIERO OBTENER
//  titulo (response.body.items.title) ITEMS ES UN ARREGLO
//  cantidad (response.body.items.quantity)
//  precio unitario (response.body.items.unit_price)
//  cuotas (response.body.installments)
//  monto total del pago (response.body.transaction_amount)
//  costo por cuota (response.body.installment_amount)
//  precio total con interes agregados (response.body.total_paid_amount)
// Armar un objeto con esos detalles y guardarlo en la base de datos
