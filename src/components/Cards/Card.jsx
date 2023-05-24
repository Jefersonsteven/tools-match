"use client";

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { FaHeart } from "react-icons/fa";
import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";

const Card = ({ title, photo, price, type, perDay, id }) => {
  const { isFavorite, setIsFavorite, favorites, setFavorites } =
    useContext(AppContext);

  useEffect(() => {
    // Recuperar favoritos del local storage al cargar el componente
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    if (storedFavorites.includes(id)) {
      setIsFavorite(true);
    }
  }, [id, setIsFavorite, setFavorites]);

  const handleCardFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    // Actualizar favoritos en el local storage
    const updatedFavorites = isFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Si la tarjeta se eliminó de los favoritos, redirigir a la página de favoritos
    if (isFavorite) {
      router.push(`/favorite/${id}`);
    }
  };

  return (
    <Link href={`/post/${id}`}>
      <div className={`${styles.cardContainer} bg-white rounded-md p-4`}>
          <FaHeart
            className={`${styles.favoriteIcon} ${
              isFavorite ? styles.favoriteActive : ""
            }`}
            onClick={handleCardFavoriteClick}
          />
        <div className={styles.imageContainer}>
          <Image
            onError={(event) =>
              (event.target.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ5uqj17TEhCijObvQMPqwOXCIgOF36SvFw&usqp=CAU")
            }
            width={230}
            height={152}
            src={photo}
            alt={title}
            className={`${styles.cardImage} rounded-md`}
          />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>
              <h2 className={styles.cardName}>{title}</h2>
            </div>
            <div className={styles.priceType}>
              <div>
                <h2 className={styles.cardPrice}>
                  <span className={styles.cardPrice}> ${price} </span>
                </h2>
              </div>
              <div className={styles.saleTypeContent}>
                <p
                  className={
                    type == "Arriendo"
                      ? "bg-yellow-500 p-2 rounded text-white"
                      : "bg-green-500 p-2 rounded text-white"
                  }
                >
                  {type}
                </p>
                <p>{perDay}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
