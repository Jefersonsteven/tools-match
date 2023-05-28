import Swal from "sweetalert2";
import axios from "axios";

export default async function confirmPurchase(userData, cart, setCart) {
  Swal.fire({
    title: 'Confirmar compra',
    text: '¿Estás seguro de que deseas completar la compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, completar compra',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const amount = cart?.items.reduce((acc, item) => acc + item.price, 0);
      
      try {
        const sendEmailBuyer = await axios.post(`/api/sendEmail/contraEntregaComprador`,  {
          email: userData.email,
          date: new Date().toString(),
          seller: {
              name: cart.items[0].author.firstname,
              lastName: cart.items[0].author.lastname,
            },
          items: cart?.items.map(({title, price}) => {
            return {
              title,
              price
            }
          }),
          amount: amount,
        })
  
  
        const products = cart.items.map(({author, title, price}) => {   
            return axios.post("api/sendEmail/contraEntregaVendedor", {
              email: author.email,
              date: new Date().toString(),
              buyer: {
                  name: userData.firstname,
                  lastName: userData.lastname
                },
              items: [
                  {
                    title,
                    price,
                  }
                ],
              amount: price
            })
        });
  
        const sendEmailSeller = await axios.all(products);
  
        const payment = await axios.post('/api/payment', {
          amount: amount,
          currency: "USD",
          userId: userData.id,
        })
  
        const order = await axios.post("/api/order", {
          status: "proccess",
          userId: userData.id,
          postId: cart.items.map(item => item.id),
          paymentId: payment.data.payment.id,
      })
      } catch (error) {
        Swal.fire('¡Fallo el pedido!', 'El pedido no se pudo realizar.', 'error')
      }

      // se setea el carrito
      if (typeof window !== "undefined") {
        setCart({
          count: 0,
          items: [],
        });
        localStorage.setItem(
          "cart",
          JSON.stringify({
            count: 0,
            items: [],
          })
        );
      }

      Swal.fire('¡Compra completada!', 'La compra se ha realizado exitosamente.', 'success');

      setTimeout(function() {
        window.location.href = `/perfil/${userData.id}`;
      }, 2000);
    }
  });
}