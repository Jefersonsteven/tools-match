"use client";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from "@/components/Cards/Card";
import styles from "./Favorites.module.css";
import Back from "@/components/back/Back";
import Swal from "sweetalert2";
import { MdAddShoppingCart } from "react-icons/md";

const Favorites = () => {
  const router = useRouter();
  const [visibleCards, setVisibleCards] = useState(4);
  const {
    userData,
    favorite,
    setFavorite,
    favoriteArray,
    setFavoriteArray,
    cart,
    setCart,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`api/user/${userData.email}`);
      if (userData && userData.email) {
        setFavoriteArray(
          user.data.favorites.map((card) => ({ ...card, checked: false }))
        );
        setFavorite((prevFavorite) => ({
          ...prevFavorite,
          count: user.data.favorites.length,
        }));
      }
    };

    fetchData();
    if (!favorite) {
      setFavorite({
        count: 0,
      });
    }
  }, []);

  const addToCard = (id) => {
    const selectedCard = favoriteArray.find((card) => card.id === id);

    if (cart.items.some((cartItem) => cartItem.id === id)) {
      Swal.fire({
        title: "¡Producto ya agregado!",
        text: "Este artículo ya se encuentra en tu carrito.",
        icon: "warning",
        showCancelButton: false,
        timer: 2000,
        didOpen: () => {
          setTimeout(() => {
            Swal.close();
          }, 2000);
        },
      });
      return;
    }

    setCart(({ count, items }) => ({
      count: count + 1,
      items: [...items, selectedCard],
    }));

    Swal.fire({
      title: "¡Agregado al carrito!",
      text: "El artículo se ha agregado al carrito correctamente.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Ir al carrito",
      cancelButtonText: "Seguir comprando",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/cart");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.push("/home");
      }
    });
  };

  const handleSeeMoreClick = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
  };

  return (
    <div>
      <Back />
      <h1 className={styles.favTitle}>Favoritos</h1>
      <div className={styles.favContainer}>
        {favoriteArray.length > 0 ? (
          favoriteArray.slice(0, visibleCards).map((card) => (
            <div className={styles.favInfo} key={card.id}>
              <Card
                photo={card.photo[0]}
                title={card.title}
                price={card.price}
                id={card.id}
                typeStyle={{ width: "100%", textAlign: "center" }}
                type={card.type === "RENTAL" ? "Arriendo" : "Venta"}
              />
              <div
                className={styles.addToCartButton}
                onClick={() => addToCard(card.id)}
              >
                <MdAddShoppingCart className={styles.addToCartIcon} />
                <span className={styles.cartText}>Agregar al Carrito</span>
              </div>
            </div>
          ))
        ) : (
          <h2 className={styles.favSubTitle}>No Tiene Ningún Favorito</h2>
        )}
      </div>
      {favoriteArray.length > visibleCards && (
        <div>
          <button className={styles.favSeeMore} onClick={handleSeeMoreClick}>
            Ver Más
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
