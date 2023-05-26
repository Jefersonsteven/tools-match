
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import styles from "./CardsOrders.module.css";
import CardsPurchasedItems from "./CardsPurchasedItems";

const CardsOrders = ({ userOrders }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCardClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        {userOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 my-2 bg-white rounded-md shadow-md cursor-pointer"
            onClick={() => handleCardClick(order)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AiFillCheckCircle className="text-green-500 mr-2 ml-6 text-4xl" />
                <FaShoppingCart className="text-black text-4xl" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-black font-bold text-3xl">$ {order.amount}</h3>
                <div className="flex items-center">
                  <h4 className="text-gray-400 text-lg mr-2">{formatDate(order.date)}</h4>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={selectedOrder !== null}
        onRequestClose={closeModal}
        className={styles.customModal}
        overlayClassName={styles.customOverlay}
        contentLabel="Purchased Items Modal"
      >
        {selectedOrder && (
          <>
            <div className={styles.modalHeader}>
              <button className={styles.closeButton} onClick={closeModal}>
                <AiOutlineClose />
              </button>
            </div>
            <div className={styles.modalContent}>
              <CardsPurchasedItems
                orderPosts={selectedOrder.postId}
                orderDate={formatDate(selectedOrder.date)}
                multipleItems={selectedOrder.postId.length > 1}
              />
            </div>
          </>
        )}
      </Modal>
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