const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    const { items, payer } = req.body;
    const URL_BASE = process.env.DEPLOY_BACK || 'http://localhost:3000'
    const response = await fetch(`${URL_BASE}/api/user/${payer.name}`);
    const user = await response.json();

    if (!user) throw new Error("No se encuentra el usuario con el que deseas realizar la compra")

    mercadopago.configure({
      access_token: "TEST-5795718698863749-051622-c31f13a1fa61032ebb4ddcdf861a0d09-1375420066" 
      // process.env.ACCESS_TOKEN_MERCADOPAGO,
    });
    const preference = {
      items,
      payer,
      back_urls: {
        success: `${URL_BASE}/payment`,
        failure: `${URL_BASE}/payment`,
        pending: `${URL_BASE}`,
      },
      notification_url:
        `${URL_BASE}/api/mercadopago/pago`,
      auto_return: "approved",
    };
    try {
      const response = await mercadopago.preferences.create(preference);
      const paymentLink = response.body.sandbox_init_point;
      const linkMercadoPago = response.body.init_point;
      res.status(200).json({
        LinkDePagoSandbox: paymentLink,
        LinkDePagoInit: linkMercadoPago,
        Respuesta: response.body,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    } 
  }
}
