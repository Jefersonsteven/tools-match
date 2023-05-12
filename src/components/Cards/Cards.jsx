"use client"
import Card from './Card';
import { AppContext } from "@/context/AppContext";
import { useContext } from 'react';


const Cards = (tool) => {
  const { filter } = useContext(AppContext);
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {filter.map((tool, index) => (
          <div className="w-full" key={tool.title} >
            <Card
              photo={tool.photo}
              title={tool.title}
              price={tool.price}
              type={`${tool.type === 'LEASE' ? "Arriendo" : "Venta"}`}
            //perDay={`${tool.price.alquiler > 0 ? "Por dia" : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;