import React, { useState } from "react";
import FormReview from "./FormReview";

const CardsOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <div className="flex justify-center">
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
            <p
              className={
                order.type === "Venta" ? "text-green-500" : "text-yellow-500"
              }
            >
              {order.type === "Venta" ? "Venta" : "Arriendo"}
            </p>
            <div className="flex justify-end">
              {" "}
              {/* Nueva línea */}
              <button
                className="bg-black text-white py-1 px-3 rounded-1 rounded-r"
                onClick={() => handleOpenModal(order)}
              >
                Reseña
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <FormReview order={selectedOrder} onCloseModal={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default CardsOrders;


// import React, { useState, useEffect } from "react";
// import FormReview from "./FormReview";

// const CardsOrders = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [userOrders, setUserOrders] = useState([]);

//   useEffect(() => {
//     // Hacer la solicitud a la API para obtener los datos del usuario
//     fetch(`http://localhost:3000/api/admin/user/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Obtener las órdenes del usuario
//         const orders = data.orders || [];
//         setUserOrders(orders);
//       })
//       .catch((error) => {
//         console.error("Error al obtener los datos del usuario:", error);
//       });
//   }, []);

//   const handleOpenModal = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="w-full max-w-xl">
//         {userOrders.map((order) => (
//           <div
//             key={order.id}
//             className="p-4 my-2 bg-white rounded-md shadow-md"
//           >
//             <div className="flex justify-between">
//               <h3 className="text-black font-bold">{order.title}</h3>
//               <p className="text-black font-bold">{order.price}</p>
//             </div>
//             <p
//               className={
//                 order.type === "Venta" ? "text-green-500" : "text-yellow-500"
//               }
//             >
//               {order.type === "Venta" ? "Venta" : "Arriendo"}
//             </p>
//             <div className="flex justify-end">
//               <button
//                 className="bg-black text-white py-1 px-3 rounded-1 rounded-r"
//                 onClick={() => handleOpenModal(order)}
//               >
//                 Reseña
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {isModalOpen && (
//         <div className="modal">
//           <FormReview order={selectedOrder} onCloseModal={handleCloseModal} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardsOrders;
