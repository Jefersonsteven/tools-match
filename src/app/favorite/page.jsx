"use client";

import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Card from "@/components/Cards/Card";
import styles from "./Favorites.module.css";
import Link from "next/link";
import Back from "@/components/back/Back";

const Favorites = () => {
  return (
    <div>
      <Back />
      <h2 className={styles.favTitle}>No Tiene Ningún Favorito</h2>
    </div>
  );
};
//   const { favorites, setFavorites } = useContext(AppContext);
//   const [favoriteCards, setFavoriteCards] = useState([]);

//   useEffect(() => {
//     const fetchFavoriteCards = async () => {
//       try {
//         const response = await fetch(
//           `/api/favorites?id=${favorites.join(",")}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setFavoriteCards(data);
//         } else {
//           console.error(
//             "Error al obtener los detalles de las publicaciones favoritas:",
//             response.statusText
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Error al obtener los detalles de las publicaciones favoritas:",
//           error
//         );
//       }
//     };

//     if (favorites.length > 0) {
//       fetchFavoriteCards();
//     }
//   }, [favorites]);

//   return (
//     <div>
//       <Back />
//       <h2 className={styles.favTitle}>Publicaciones en Favoritos</h2>
//       <div className={styles.favCard}>
//         {favoriteCards.map((card) => (
//           <Card key={card.id} {...card} />
//         ))}
//       </div>
//     </div>
//   );
// };

export default Favorites;
