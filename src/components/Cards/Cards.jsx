"use client"
import Card from './Card';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';


const Cards = (tool) => {
  const { cards } = useContext(AppContext);
  return (
    <AppProvider>
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {cards.map(tool => (
          <div className="w-full" key={tool.name}>
            <Card
              imageUrl={tool.imageUrl}
              name={tool.name}
              price={`${tool.price.venta > 0 ? tool.price.venta : tool.price.alquiler}`}
              saleType={`${tool.price.alquiler > 0 ? "Arriendo" : "Venta"}`}
              perDay={`${tool.price.alquiler > 0 ? "Por dia" : ""}`}
                          />
          </div>
        ))}
      </div>
    </div>
    </AppProvider>
  );
};

export default Cards;