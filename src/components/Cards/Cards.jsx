"use client";
import Card from "./Card";
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useContext } from "react";
import axios from "axios";

const Cards = () => {
  const { cards, setCards, setFilteredCards } = useContext(AppContext);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/post").then((res) => {
      setCards(res.data);
      setFilteredCards(res.data);
    });
  }, [setCards, setFilteredCards]);

  return (
    <AppProvider>
      <div className="p-4 px-2">
        <div className="grid grid-cols-4 gap-9">
          {cards.length > 0 &&
            cards.slice(0, 20).map((tool) => (
              <div className="w-full" key={tool.id}>
                <Card
                  photo={tool.photo[0]}
                  title={tool.title}
                  price={tool.price}
                  type={`${tool.type === "RENTAL" ? "Arriendo" : "Venta"}`}
                  id={tool.id}
                  //perDay={`${tool.price.alquiler > 0 ? "Por dia" : ""}`}
                />
              </div>
            ))}
        </div>
      </div>
    </AppProvider>
  );
};

export default Cards;
