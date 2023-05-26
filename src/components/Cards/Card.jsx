"use client";

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { FaHeart } from "react-icons/fa";
import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Card = ({ title, photo, price, type, perDay, id }) => {
  const { favorites, setFavorites, favorite, setFavorite, userData } =
    useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/user/${userData.email}`);
        const user = response.data;
        let favoriteArray = user.favoritesId;

        if (favoriteArray.includes(id)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userData && userData.email) {
      fetchData();
    }
  }, [favorites, id, userData, refresh]);

  const handleFavoriteClick = async (id) => {
    const user = await axios.get(`api/user/${userData.email}`);
    if (userData && userData.email) {
      let favoriteArray = await user.data.favoritesId;
      if (favoriteArray.includes(id) === true) {
        let newFav = favoriteArray.filter((e) => e !== id);
        favoriteArray = newFav;
        setIsFavorite(false);
      } else {
        favoriteArray.push(id);
        setIsFavorite(true);
      }
      try {
        // Update the favorites array in the API
        const response = await axios.put(`api/user/${userData.email}`, {
          favoritesId: favoriteArray,
        });
      } catch (error) {
        console.error(error);
      }
      console.log(favoriteArray);
    } else {
      //TODO: agregar alerrta o algo parecido donde diga que para agregar favoritos debe iniciar sesion
      console.error("userData or email is null or undefined");
    }
    setRefresh(!refresh);
  };

  return (
    <div className={`${styles.cardContainer} bg-white rounded-md p-4`}>
      <div className={styles.favoriteContainer}>
        <FaHeart
          className={
            isFavorite ? styles.favoriteIconActive : styles.favoriteIcon
          }
          onClick={() => handleFavoriteClick(`${id}`)}
        />
      </div>
      <Link href={`/post/${id}`}>
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
      </Link>
      <div className={styles.cardInfo}>
        <div className={styles.cardContent}>
          <Link href={`/post/${id}`}>
            <div className={styles.cardTitle}>
              <h2 className={styles.cardName}>{title}</h2>
            </div>
          </Link>
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
  );
};

export default Card;
