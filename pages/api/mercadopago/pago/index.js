const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    try {
      const response = await mercadopago.payment.get(req.body.data.id);
      if (response.body.status !== "approved") {
        res.status(200).send();
        return;
      }
      const name = response.body.additional_info.payer.first_name;
      const URL_BASE = process.env.DEPLOY_BACK || "http://localhost:3000";
      const responseUser = await fetch(`${URL_BASE}/api/user/${name}`);
      const user = await responseUser.json();
      if (user) {
        await fetch(`${URL_BASE}/api/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: response.body.transaction_amount,
            currency: response.body.currency_id,
            userId: user.id,
          }),
        });
      } else {
        throw new Error("No se va a poder registrar su compra en el historial");
      }
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
