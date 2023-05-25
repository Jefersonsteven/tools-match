import axios from "axios";

export default async function payMercadoPago(body){
    const data = await axios.post('/api/mercadopago', body);
    return data.data;
}