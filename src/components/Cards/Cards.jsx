"use client";
import Card from "./Card";
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Paginated from "../paginated/Paginated";


const Cards = () => {
  const { cards, setCards, setFilteredCards } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    axios.get("/api/admin/post").then((res) => {
      setCards(res.data);
      setFilteredCards(res.data);
    });
  }, [setCards, setFilteredCards]);

  const paginatedUrl = `/api/paginated?page=${currentPage}&limit=${cardsPerPage}`;

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = Array.isArray(cards)
    ? cards.slice(startIndex, endIndex)
    : [];

  const isPageEmpty = currentCards.length === 0;

  return (
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
          {isPageEmpty && (
            <p className="text-center mt-4">
              No hay publicaciones disponibles.
            </p>
          )}
        </div>
        <Paginated
          url={paginatedUrl}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
  );
};

export default Cards;
