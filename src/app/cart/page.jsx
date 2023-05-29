"use client";

import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import style from "./Cart.module.css";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Back from "@/components/back/Back";

export default function Page() {
  const router = useRouter();
  const { cart, setCart, userData } = useContext(AppContext);

  useEffect(() => {
    if (!cart) {
      setCart({
        count: 0,
        items: [],
      });
    }
  }, [setCart, cart]);

  function deleteItem(id) {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);
      const updatedCart = {
        ...prevCart,
        count: prevCart.count - 1,
        items: updatedItems,
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  return (
    <div className={style.container}>
      <div className={style.backcontainer}>
        <Back />
      </div>
      <div className={style.cartContainer}>
        <h2>Carrito de Compras</h2>
        <div className={style.cart}>
          <div className={style.cartCards}>
            <div className={style.cartAmount}>
              <h3>Total:</h3>
              <h3>
                {cart?.count > 0
                  ? `$${cart.items.reduce((acc, item) => acc + item.price, 0)}`
                  : `$0`}
              </h3>
            </div>
            {cart?.count > 0 ? (
              cart.items.map((item) => (
                <div className={style.cartItem} key={item.id}>
                  <Image
                    className={style.cartItemImg}
                    src={item.photo[0]}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                  <div className={style.cartDetailContainer}>
                    <div className={style.cartItemDetail}>
                      <h3 className={style.cartItemTitle}>{item.title}</h3>
                      <p className={style.cartItemPrice}>
                        Precio ${item.price}
                      </p>
                    </div>
                    <AiFillCloseCircle
                      size={25}
                      color="var(--red)"
                      onClick={() => deleteItem(item.id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={style.cartEmpty}>No hay productos en el carrito</p>
            )}
          </div>
          <div className={style.cartButton}>
            <Link href={cart?.count > 0 ? "/payment" : "/cart"}>
              <button>Finalizar la Compra</button>
            </Link>
            <Link href="/home">
              <button>Seguir Comprando</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
