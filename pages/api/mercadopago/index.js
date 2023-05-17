const mercadopago = require("mercadopago");

export default function handler(req, res) {
  const { method } = req;
  if (method == "POST") {
    mercadopago.configure({
      access_token:
        "TEST-2453755324059058-051514-f7c74b6634388bb60e0826be077467e5-1374342095",
    });
    const { items } = req.body;
    // items debe ser un arreglo de objetos que tenga las propiedadedades de: 
    // - title(nombre del producto)
    // - description(descripción del producto)
    // - quantity(cantidad que se va a comprar del producto)
    // - unit_price(precio unitario del producto )
    // - currency_id(ARS: peso Arg / BRL: real Bra / CLP: peso Chi / MXN: peso Mex / COP: peso Col / PEN: sol Per / UYU: peso Uru)
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

    try {
        mercadopago.preferences
          .create(preference)
          .then((response) => {
            const paymentLink = response.body.sandbox_init_point;
            res.json({
              LinkDePago: paymentLink,
              Respuesta: response.body,
            });
          })
    } catch (error) {
        res.sattus(400).json({Error: 'No se ha podido crear el pago'})   
    }
  }
}
