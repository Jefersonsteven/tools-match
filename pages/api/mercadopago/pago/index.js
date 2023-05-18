const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    try {
      const response = await mercadopago.payment.get(req.body.data.id);
      const name = response.body.additional_info.payer.first_name;
      const URL_BASE = process.env.DEPLOY_BACK || 'http://localhost:3000'
      const responseUser = await fetch(`${URL_BASE}/api/user/${name}`);
      const user = await responseUser.json();
      if (user) {
        console.log('Costo total: ' + response.body.transaction_amount)
        console.log('Tipo de moneda: ' + response.body.currency_id)
        console.log(response.body)
      } else
        throw new Error("No se va a poder registrar su compra en el historial");
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
