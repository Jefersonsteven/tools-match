"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@/components/Cards/Card";
import styles from "./Favorites.module.css";
import Back from "@/components/back/Back";

const Favorites = () => {
  const [favoriteArray, setFavoriteArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const user = await axios.get(`api/user/${userData.email}`);

      // Update favoriteArray with the data from the response
      if (userData && userData.email) {
        console.log(user.data.favorites.length);
        setFavoriteArray(user.data.favorites);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <Back />
      <h1 className={styles.favTitle}>Favoritos</h1>
      {favoriteArray.length > 0 ? (
        favoriteArray.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            photo={card.photo}
            price={card.price}
            type={card.type}
            perDay={card.perDay}
          />
        ))
      ) : (
        <h2 className={styles.favSubTitle}>No Tiene Ningún Favorito</h2>
      )}
    </div>
  );
};

export default Favorites;
