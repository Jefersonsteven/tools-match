import React, { useState } from "react";
import FormReview from "./FormReview";

const CardsOrders = ({ userOrders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewedOrders, setReviewedOrders] = useState([]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        {userOrders.map((order) => (
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
                order.type === "SALE" ? "text-green-500" : "text-yellow-500"
              }
            >
              {order.type === "SALE" ? "Venta" : "Arriendo"}
            </p>
            {reviewedOrders.includes(order.id) && (
              <div>
                <span role="img" aria-label="review-indicator">✅</span>
              </div>
            )}
            <div className="flex justify-end">
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
          <FormReview
            selectedOrder={selectedOrder}
            onCloseModal={handleCloseModal}
            setReviewedOrders={setReviewedOrders}
          />
        </div>
      )}
    </div>
  );
};

export default CardsOrders;

// import React from "react";
// import FormReview from "./FormReview";
// import { useState }from "react";

// const CardsOrders = ({ userOrders }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

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
//                 order.type === "SALE" ? "text-green-500" : "text-yellow-500"
//               }
//             >
//               {order.type === "SALE" ? "Venta" : "Arriendo"}
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
//           <FormReview selectedOrder={selectedOrder} onCloseModal={handleCloseModal} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardsOrders;