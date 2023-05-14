"use client"
import Card from './Card';
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useContext } from 'react';
import axios from 'axios';


const Cards = () => {
  const { cards, setCards } = useContext(AppContext);

  
    useEffect(() => {
      if (cards.length ===0)
      axios.get('http://localhost:3000/api/admin/post').then(res => setCards(res.data))       
      }, []);
  

  return (
    <AppProvider>
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {cards.length > 0 && cards.map(tool => (
          <div className="w-full" key={tool.name}>
            <Card
              photo={tool.photo}
              title={tool.title}
              price={tool.price}
              type={`${tool.type==='RENTAL' ? "Arriendo" : "Venta"}`}
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