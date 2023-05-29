"use client";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from "@/components/Cards/Card";
import styles from "./Favorites.module.css";
import Back from "@/components/back/Back";

const Favorites = ({ title, price, type }) => {
  const router = useRouter();
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { userData, favorite, setFavorite } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const user = await axios.get(`api/user/${userData.email}`);

      // Update favoriteArray with the data from the response
      if (userData && userData.email) {
        // console.log(user.data.favorites.length);
        setFavoriteArray(user.data.favorites);
        setRefresh(!refresh);
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
  }, [favorite, setFavorite, refresh]); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <Back />
      <div className={styles.favTitle}>
        <h1>Favoritos</h1>
      </div>
      <div className={styles.favContainer}>
        {favoriteArray.length > 0 ? (
          favoriteArray.map((card) => (
            <div className={styles.favCards} key={card.id}>
              <Card
                photo={card.photo[0]}
                title={card.title}
                price={card.price}
                id={card.id}
                typeStyle={{ width: "100%", textAlign: "center" }}
                type={card.type === "RENTAL" ? "Arriendo" : "Venta"}
              />
            </div>
          ))
        ) : (
          <h2 className={styles.favSubTitle}>No Tiene Ningún Favorito</h2>
        )}
      </div>
    </div>
  );
};

export default Favorites;
