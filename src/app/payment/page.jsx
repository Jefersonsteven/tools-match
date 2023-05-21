"use client";
import { useContext, useState } from "react";
import styles from "./payment.module.css";
import validateForm from "./assets/validateForm";
import payMercadoPago from "./assets/payMercadopago";
import { SiMercadopago } from "react-icons/si";
import { AppContext } from "@/context/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const [errors, setErros] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const { userData, cart, setCart } = useContext(AppContext);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!userData.id) {
      router.push("/form/login");
    }

    const status = params.get("status");
    if (status === "approved") {
      setCart({
        count: 0,
        items: [],
      });

      if (typeof window !== "undefined") {
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
  }, [params, router, setCart, userData]);

  useEffect(() => {
    if (!form.fullname) {
      const FORM = {
        fullname: `${userData.firstname} ${userData.lastname}`,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: "",
      };
      setForm(FORM);
      validateForm(FORM, errors, setErros);
    }
  }, [userData, form, errors]);

  function handleForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
    validateForm({ ...form, [name]: value }, errors, setErros, setDisabled);
  }

  const body = {
    items: cart.items.map(({ title, content, price }) => {
      return {
        title,
        content,
        quantity: 1,
        unit_price: price,
        currency_id: "USD",
      };
    }),
    payer: {
      name: userData.email,
    },
  };

  async function handleMercadoPago() {
    const { LinkDePagoSandbox, LinkDePagoInit } = await payMercadoPago(body);
    window.location.href = LinkDePagoSandbox;
  }

  // const temp = {
  //   items: [
  //     {
  //       title: "Martillo",
  //       content: "Martillo usada 3 veces",
  //       quantity: 5,
  //       unit_price: 2,
  //       currency_id: "USD",
  //     },
  //     {
  //       title: "Destornillador",
  //       description: "En buen estado, se utilizó una única vez",
  //       quantity: 1,
  //       unit_price: 5,
  //       currency_id: "USD",
  //     },
  //   ],
  //   payer: {
  //     name: "test_user_1555855231@testuser.com",
  //   },
  // };

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
            {cart.items.map((item) => (
              <div key={item.id} className={styles.item}>
                <h4>{item.title}</h4>
                <h4>${item.price}</h4>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <h3>TOTAL:</h3>
            <h3>${cart.items.reduce((acc, item) => acc + item.price, 0)}</h3>
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
