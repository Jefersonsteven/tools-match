const mercadopago = require("mercadopago");

const notificacion_pagos = []
let payment = 1
export default function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    console.log(req.body);
    mercadopago.payment
      .get(req.body.data.id)
      .then((response) => {
        const pago = `payment-${payment}`
        notificacion_pagos.push({[pago]: response.body})
        payment = payment + 1
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
      });
  }
  if (method == "GET") {
    res.status(200).json({PagosRealizados: notificacion_pagos})
  }
}
