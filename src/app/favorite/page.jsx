"use client";

import React, { useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { FaHeart } from "react-icons/fa";
import styles from "./Favorites.module.css";
import Link from "next/link";
import Image from "next/image";
import Back from "@/components/back/Back";
import { useRouter } from "next/navigation";

const Favorite = () => {
  const router = useRouter();
  const [favoriteCard, setFavoriteCard] = useState(null);

  useEffect(() => {
    // Recuperar los datos de la card favorita del local storage
    const storedFavoriteCard = localStorage.getItem("favoriteCard");
    if (storedFavoriteCard) {
      setFavoriteCard(JSON.parse(storedFavoriteCard));
    }
  }, []);

  return (
    <div>
      <Back />
      {favoriteCard ? (
        <div>
          <h2 className={styles.favContent}>{favoriteCard.title}</h2>
          <Image src={favoriteCard.photo} alt={favoriteCard.title} />
          {/* Resto de los detalles de la card favorita */}
        </div>
      ) : (
        <p>No hay una card favorita seleccionada.</p>
      )}
    </div>
  );
};

export default Favorite;
