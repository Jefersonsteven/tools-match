import Card from "./Card";
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Paginated from "../paginated/Paginated";
import { App } from "antd";
import Loader from "../Loader/Loader";

const Cards = () => {
  const { cards, setCards, setFilteredCards, currentPage, setCurrentPage } =
    useContext(AppContext);

  /*----------PAGINATED----------*/

  const cardsPerPage = 8;
  /*-------------------------------*/

  useEffect(() => {
    axios.get(`/api/admin/post`).then((res) => {
      setCards(res.data);
      setFilteredCards(res.data);
    });
  }, [setCards, setFilteredCards]);

  /* ----------PAGINATED ----------- */

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = Array.isArray(cards)
    ? cards.slice(indexOfFirstCard, indexOfLastCard)
    : [];

  const isPageEmpty = currentCards.length === 0;

  const totalPages = Math.ceil(setFilteredCards.length / cardsPerPage);

  const paginatedUrl = `/api/paginated?page=${currentPage}&limit=${cardsPerPage}`;

  /* --------------------------------- */

  return (
    <AppProvider>
      <div className="p-4 px-2">
        <div className="grid grid-cols-4 gap-9">
          {currentCards.map((tool) => (
            <div className="w-full" key={tool.id}>
              <Card
                photo={tool.photo[0]}
                title={tool.title}
                price={tool.price}
                type={tool.type === "RENTAL" ? "Arriendo" : "Venta"}
                id={tool.id}
              />
            </div>
          ))}

          {/* ----------- PAGINATED ---------- */}
          {isPageEmpty && <Loader />}
        </div>
        {cards.length > cardsPerPage && (
          <Paginated
            url={paginatedUrl}
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
