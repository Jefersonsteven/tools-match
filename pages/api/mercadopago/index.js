const mercadopago = require("mercadopago");

export default async function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    // ITEMS DEBE SER UN ARREGLO DE OBJETOS CON LAS PROPIEDADES:
    // - title(nombre del producto)
    // - description(descripción del producto)
    // - quantity(cantidad que se va a comprar del producto)
    // - unit_price(precio unitario del producto )
    // - currency_id(ARS: peso Arg / BRL: real Bra / CLP: peso Chi / MXN: peso Mex / COP: peso Col / PEN: sol Per / UYU: peso Uru)
    
    // PAYER DEBE SER UN OBJETO CON LAS PROPIEDADES:
    // - name(email del usuario)

    const URL_BASE = "http://localhost:3000";
    const { items, payer } = req.body;
    const response = await fetch(`${URL_BASE}/api/user/${payer.name}`);
    const user = await response.json();

    if (!user) throw new Error("Faltan datos por completar")

    mercadopago.configure({
      access_token: req.body.token,
    });
    const preference = {
      items,
      payer,
      back_urls: {
        success: "http:localhost:3005/succes",
        failure: "http:localhost:3005/failure",
        pending: "http:localhost:3005/pending",
      },
      notification_url:
        "https://11b0-181-98-73-247.ngrok-free.app/api/mercadopago/pago",
      // cuando este deployado el serviddor, la urle dbe ser url_del_servidor/api/mercadopago/pago
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
      res.sattus(400).json({ error: error.message });
    }
  }
}
