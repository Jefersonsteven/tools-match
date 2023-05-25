"use client";
import { useContext, useState } from "react";
import styles from "./payment.module.css";
import validateForm from "./assets/validateForm";
import payMercadoPago from "./assets/payMercadopago";
import { SiMercadopago } from "react-icons/si";
import { AppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Page() {
  const [disabled, setDisabled] = useState(true);
  const [gateway, setGateway] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const { userData, cart, setCart } = useContext(AppContext);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!userData.firstname) router.push("/form/login");

    const status = params.get("status");

    if (status === "approved") {
      // Se crea la order
      axios.get(`/api/user/${userData.email}`)
        .then(res => {
          const paymentId = res.data.payments[res.data.payments.length - 1].id;
          console.log(paymentId);

          axios.post('/api/order', {
            status: "complete",
            userId: userData.id,
            postId: cart.items.map(item => item.id),
            paymentId: paymentId
          })
          .then(order => console.log(order.data))
          .catch(error => console.log(error))
        })

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

      Swal.fire({
        title: "¡Compra aprobada!",
        text: "Tu compra ha sido aprobada correctamente.",
        icon: "success",
      }).then(() => {
        router.push(`/perfil/${userData.id}`);
      });
    }
  }, [params, router, setCart, userData, cart]);

  useEffect(() => {
    if (!form.fullname) {
      const FORM = {
        fullname: `${userData.firstname} ${userData.lastname}`,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: "",
      };
      setForm(FORM);
      validateForm(FORM, errors, setErrors);
    }
  }, [userData, form, errors]);

  function handleForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
    validateForm({ ...form, [name]: value }, errors, setErrors, setDisabled);
  }

  const body = {
    items: cart && cart.items?.map(({ title, content, price }) => {
      return {
        title,
        content,
        quantity: 1,
        unit_price: price,
        currency_id: "USD",
      };
    }),
    payer: {
      name: userData && userData.email,
    },
  };

  async function handleMercadoPago() {
    const { LinkDePagoSandbox, LinkDePagoInit } = await payMercadoPago(body);
    window.location.href = LinkDePagoSandbox;
  }

  return (
    <main className={styles.container}>
      <section className={styles.form_container}>
        <form className={styles.form}>
          <div>
            <label htmlFor="">Nombre Completo:</label>
            <input
              onChange={handleForm}
              type="text"
              value={form.fullname}
              name="fullname"
            />
            <span>{errors.fullname}</span>
          </div>
          <div>
            <label htmlFor="">Correo:</label>
            <input
              onChange={handleForm}
              type="email"
              value={form.email}
              name="email"
            />
            <span>{errors.email}</span>
          </div>
          <div>
            <label htmlFor="">Celular:</label>
            <input
              onChange={handleForm}
              type="number"
              value={form.phoneNumber}
              name="phone"
            />
            <span>{errors.phoneNumber}</span>
          </div>
          <div>
            <label htmlFor="">Direccion:</label>
            <input
              onChange={handleForm}
              type="text"
              value={form.address}
              name="address"
            />
            <span>{errors.address}</span>
          </div>
        </form>
      </section>
      <section className={styles.payment}>
        <div className={styles.cart}>
          <div className={styles.cartItems}>
            {cart.items?.map((item) => (
              <div key={item.id} className={styles.item}>
                <h4>{item.title}</h4>
                <h4>${item.price}</h4>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <h3>TOTAL:</h3>
            <h3>${cart?.items.reduce((acc, item) => acc + item.price, 0)}</h3>
          </div>
        </div>
        <div className={styles.gateway}>
          <button onClick={() => setGateway(true)} disabled={disabled}>
            Opciones de Pago
          </button>
          {gateway && (
            <div>
              <button>Contra Entrega</button>
              <button>Tarjeta de credito</button>
              <button
                className={styles.mercadopago}
                onClick={handleMercadoPago}
              >
                <SiMercadopago size={35} color="#fff" />
                <p>Mercado Pago</p>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Page;
