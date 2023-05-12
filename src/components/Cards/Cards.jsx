"use client"
import Card from './Card';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';


const Cards = (tool) => {
  const { cards,tools } = useContext(AppContext);
  return (
    <AppProvider>
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {tools.map(tool => (
          <div className="w-full" key={tool.name}>
            <Card
              photo={tool.photo}
              title={tool.title}
              price={tool.price}
              type={`${tool.type==='LEASE' ? "Arriendo" : "Venta"}`}
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