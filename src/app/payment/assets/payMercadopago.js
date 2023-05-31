import axios from "axios";

export default async function payMercadoPago(body){
    try {
        const data = await axios.post('/api/mercadopago', body);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
}