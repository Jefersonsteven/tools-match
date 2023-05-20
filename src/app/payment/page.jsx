"use client";
import { useContext, useState } from "react";
import styles from "./payment.module.css";
import validateForm from "./assets/validateForm";
import payMercadoPago from "./assets/payMercadopago";
import { SiMercadopago } from "react-icons/si";
import { AppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const [disabled, setDisabled] = useState(true);
  const [gateway, setGateway] = useState(false);
  const { userData } = useContext(AppContext);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // if (!userData?.name) router.push("/form/login");
    const status = params.get("status");
    if (status === "approved") {
      // se borra el estado del carrito
      // se redirecciona al del perfil
      console.log("Vamos al perfil");
    }
  }, [params, router, userData]);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErros] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
    validateForm({ ...form, [name]: value }, errors, setErros, setDisabled);
  }

  async function handleMercadoPago() {
    const { LinkDePagoSandbox, LinkDePagoInit } = await payMercadoPago(temp);
    window.location.href = LinkDePagoSandbox;
  }

  // const body = {
  //     items: cart,
  //     payer: {
  //         name: form.email
  //     }
  // }

  const temp = {
    items: [
      {
        title: "Martillo",
        content: "Martillo usada 3 veces",
        quantity: 5,
        unit_price: 2,
        currency_id: "USD",
      },
      {
        title: "Destornillador",
        description: "En buen estado, se utilizó una única vez",
        quantity: 1,
        unit_price: 5,
        currency_id: "USD",
      },
    ],
    payer: {
      name: "test_user_1555855231@testuser.com",
    },
  };

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
              value={form.phone}
              name="phone"
            />
            <span>{errors.phone}</span>
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
          <div className={styles.cartItems}></div>
          <div className={styles.total}>
            <h3>TOTAL:</h3>
            <h3>TOTAL</h3>
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
