"use client";
import Card from "./Card";
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Paginated from "../paginated/Paginated";
import { App } from "antd";
import Loader from "../Loader/Loader";
import styles from "./Cards.module.css";
import LoaderRadial from "../Loader/LoaderRadial";

const Cards = () => {
  const {
    cards,
    setCards,
    setFilteredCards,
    currentPage,
    setCurrentPage,
    userId,
    isLoading,
    setIsLoading,
  } = useContext(AppContext); //userId agregado por jean
  /* const [isLoading, setIsLoading] = useState(false); */

  /*----------PAGINATED----------*/

  const cardsPerPage = 12;
  /*-------------------------------*/
  /*  // modificado por jean heyller para que cuando inicie sesion cargue las publicaciones que estan en su pais
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = userId
          ? await axios.get(`/api/admin/postByCountry/${userId}`)
          : await axios.get(`/api/admin/post`);
        
        setCards(response.data);
        setFilteredCards(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [userId, setCards, setFilteredCards]);
 */
  /* ----------PAGINATED ----------- */
  //comentado por jean para arreglar el paginado

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = Array.isArray(cards)
    ? cards.slice(indexOfFirstCard, indexOfLastCard)
    : [];

  const isPageEmpty = currentCards.length === 0;

  /* const totalPages = Math.ceil(setFilteredCards.length / cardsPerPage);

  const paginatedUrl = `/api/paginated?page=${currentPage}&limit=${cardsPerPage}`; */

  /* --------------------------------- */
  return (
    <AppProvider>
      <div className="p-4 px-2 grid justify-items-center">
        <div className={styles.cards_container}>
          {/* {currentCards.length === 0 && <LoaderRadial />} */}
          {currentCards.map((tool) => (
            <div className="w-full" key={tool.id}>
              <Card
                hidden={tool.hidden}
                photo={tool.photo[0]}
                title={tool.title}
                price={tool.price}
                id={tool.id}
                type={tool.type === "RENTAL" ? "Arriendo" : "Venta"}
                reviews={tool.reviews}
              />
            </div>
          ))}

          {/* ----------- PAGINATED ---------- */}
        </div>
        {isLoading ? (
          <LoaderRadial />
        ) : isPageEmpty ? (
          <p>No hay herramientas disponibles</p>
        ) : (
          <Paginated
            /* url={paginatedUrl} */
            currentPage={currentPage}
            itemsPerPage={cardsPerPage}
            totalPagesProp={Math.ceil(cards.length / cardsPerPage)}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
        )}
        {/* --------------------------------- */}
      </div>
    </AppProvider>
  );
};

export default Cards;
