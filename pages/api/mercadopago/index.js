const mercadopago = require("mercadopago");

export default function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    mercadopago.configure({
      access_token:
        "TEST-2453755324059058-051514-f7c74b6634388bb60e0826be077467e5-1374342095",
    });
    const { items } = req.body;
    console.log(req.body.items)
    const preference = {
      items: items,
      back_urls: {
        success: "http:localhost:3005/succes",
        failure: "http:localhost:3005/failure",
        pending: "http:localhost:3005/pending",
      },
      notification_url: "https://ab21-181-98-73-247.ngrok-free.app/api/mercadopago/pago", 
      // cuando este deployado el serviddor, la urle dbe ser url_del_servidor/api/mercadopago/pago
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then((response) => {
        const paymentLink = response.body.sandbox_init_point;
        res.json({
          LinkDePago: paymentLink,
          Respuesta: response.body,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}