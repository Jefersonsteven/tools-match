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
import Back from "@/components/back/Back";
import confirmPurchase from "./assets/alertConfirmPurchase";

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
    if (!userData) router.push("/form/login");
    if (cart.count === 0) router.push("/home");
  }, [router, userData]);

  useEffect(() => {
    const status = params.get("status");

    if (status === "approved") {
      // Se crea la order
      axios.get(`/api/user/${userData.email}`).then((res) => {
        const paymentId = res.data.payments[res.data.payments.length - 1].id;

        axios
          .post("/api/order", {
            status: "complete",
            userId: userData.id,
            postId: cart.items.map((item) => item.id),
            paymentId: paymentId,
          })
          .catch((error) => console.log(error));
      });

      // * se notifica al comprador
      axios.post(`/api/sendEmail/confirm`, {
        email: userData.email,
        id: userData.id,
      });

      //* se aplica el borrado logico a los post de venta
      //* y se cambia el estado con los de arriendo
      const items = cart.items.map((item) => {
        if (item.type === "RENTAL") {
          return axios.put(`/api/admin/post/${item.id}`, {
            status: "Arrendado",
          });
        } else {
          return axios.put(`/api/admin/post/${item.id}`, {
            hidden: true,
          });
        }
      });
      axios.all(items);

      //* se setea el carrito
      if (typeof window !== "undefined" && status === "approved") {
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
  }, [params, router, setCart, userData]);

  useEffect(() => {
    if (!form.fullname && userData) {
      const FORM = {
        fullname: `${userData?.firstname} ${userData?.lastname}`,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber,
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
    items:
      cart &&
      cart.items?.map(({ title, content, price }) => {
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
    if (errors.address === "" && errors.phoneNumber === "") {
      const { LinkDePagoSandbox, LinkDePagoInit } = await payMercadoPago(body);
      window.location.href = LinkDePagoSandbox;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, rellene todos los campos.",
      });
    }
  }

  async function handlerOnDelivery() {
    if (errors.address === "" && errors.phoneNumber === "") {
      confirmPurchase(userData, cart, setCart);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, rellene todos los campos.",
      });
    }
  }

  return (
    <div>
      <Back />
      <main className={styles.container}>
        <section className={styles.form_container}>
          <form className={styles.form}>
            <div>
              <label htmlFor="">Nombre Completo:</label>
              <input
                onChange={handleForm}
                type="text"
                defaultValue={form.fullname}
                name="fullname"
              />
              <span>{errors.fullname}</span>
            </div>
            <div>
              <label htmlFor="">Correo:</label>
              <input
                onChange={handleForm}
                type="email"
                defaultValue={form.email}
                name="email"
              />
              <span>{errors.email}</span>
            </div>
            <div>
              <label htmlFor="">Celular:</label>
              <input
                onChange={handleForm}
                type="number"
                defaultValue={form.phoneNumber}
                name="phone"
              />
              <span>{errors.phoneNumber}</span>
            </div>
            <div>
              <label htmlFor="">Direccion:</label>
              <input
                onChange={handleForm}
                type="text"
                defaultValue={form.address}
                name="address"
              />
              <span>{errors.address}</span>
            </div>
          </form>
        </section>
        <section className={styles.payment}>
          <div className={styles.cart}>
            <div className={styles.subTitles}>
              <h3>Productos</h3>
              <h3>Precio</h3>
            </div>
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
            <h4>Opciones de Pago</h4>
            <div>
              <button onClick={handlerOnDelivery}>Contra Entrega</button>
              <button
                className={styles.mercadopago}
                onClick={handleMercadoPago}
              >
                <SiMercadopago size={35} color="#fff" />
                <p>Mercado Pago</p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
