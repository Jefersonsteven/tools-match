import React, { useState } from "react";
import FormReview from "./FormReview";

const CardsOrders = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);

const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

    
  const mockOrders = [
    {
      id: "1",
      title: "Tijeras de Podar",
      type: "Venta",
      price: "$19.99",
    },
    {
      id: "2",
      title: "Cortadora de Cesped",
      type: "Arriendo",
      price: "$39.99",
    },
    {
      id: "3",
      title: "Martillo Perforador",
      type: "Venta",
      price: "$59.99",
    },
  ];

  return (
    <div className="flex justify-end">
      <div className="w-full max-w-xl">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 my-2 bg-white rounded-md shadow-md"
          >
            <div className="flex justify-between">
              <h3 className="text-black font-bold">{order.title}</h3>
              <p className="text-black font-bold">{order.price}</p>
            </div>
            <p className={order.type === "Venta" ? "text-green-500" : "text-yellow-500"}>
              {order.type === "Venta" ? "Venta" : "Arriendo"}
            </p>  
      
      <button
              className="bg-blue-500 text-white font-bold py-1 px-3 rounded"
              onClick={() => handleOpenModal(order)}
            >
              Reseña
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <FormReview order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default CardsOrders;

