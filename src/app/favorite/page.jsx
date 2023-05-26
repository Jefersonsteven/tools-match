"use client";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import Card from "@/components/Cards/Card";
import styles from "./Favorites.module.css";
import Back from "@/components/back/Back";

const Favorites = () => {
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { userData } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const user = await axios.get(`api/user/${userData.email}`);

      // Update favoriteArray with the data from the response
      if (userData && userData.email) {
        // console.log(user.data.favorites.length);
        setFavoriteArray(user.data.favorites);
        setRefresh(!refresh);
      }
    };

    fetchData();
  }, [refresh]); // Empty dependency array to run the effect only once on component mount

  return (
    <div className={styles.favContainer}>
      <Back />
      <div>
        <h1 className={styles.favTitle}>Favoritos</h1>
      </div>
      {favoriteArray.length > 0 ? (
        favoriteArray.map((card) => (
          <div className={styles.favCards} key={card.id}>
            <Card
              id={card.id}
              title={card.title}
              photo={card.photo[0]}
              price={card.price}
              type={card.type}
              perDay={card.perDay}
            />
          </div>
        ))
      ) : (
        <h2 className={styles.favSubTitle}>No Tiene Ningún Favorito</h2>
      )}
    </div>
  );
};

export default Favorites;
