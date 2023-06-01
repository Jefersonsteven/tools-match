import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import axios from "axios";
import styles from "./CardsOrders.module.css";
import CardsPurchasedItems from "./CardsPurchasedItems";

const CardsOrders = ({ userOrders, setCreatedReviews }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false); // Nuevo estado

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex justify-center">
      <div className={styles.container}>
        {userOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 my-2 bg-white rounded-md shadow-md cursor-pointer flex flex-col xl:flex-row items-center xl:justify-between justify-center xl:h-40 h-auto"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex xl:flex-row flex-col items-center">
              <AiFillCheckCircle className="text-green-500 mr-2 ml-2 text-5xl" />
              <FaShoppingCart className="text-black text-5xl" />
              <h4 className="text-black text-1000 ml-14">
                {order.types && order.types.length > 0
                  ? order.types.includes("SALE") &&
                    order.types.includes("RENTAL")
                    ? "Compra y Arriendo de varios productos"
                    : order.types.includes("RENTAL")
                    ? `Arriendo de ${order.qItems} ${
                        order.qItems > 1 ? "productos" : "producto"
                      }`
                    : `Compra de ${
                        order.qItems > 1
                          ? `${order.qItems} productos`
                          : "1 producto"
                      }`
                  : `Compra de ${
                      order.qItems > 1
                        ? `${order.qItems} productos`
                        : "1 producto"
                    }`}
              </h4>
            </div>
            <div className="flex flex-col items-end">
              <h3 className="text-black font-bold text-5xl text-xl sm:text-3xl">
                $ {order.amount}
              </h3>
              <h4 className="text-gray-800 text-lg mt-2">
                {formatDate(order.date)}
              </h4>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={selectedOrder !== null}
        onRequestClose={closeModal}
        className={
          selectedOrder?.postId?.length > 1
            ? styles.customModalTwo
            : styles.customModal
        }
        overlayClassName={styles.customOverlay}
        contentLabel="Purchased Items Modal"
      >
        {selectedOrder && (
          <>
            <div className={styles.modalContent}>
              <CardsPurchasedItems
                setCreatedReviews={setCreatedReviews}
                orderPosts={selectedOrder.postId}
                orderDate={selectedOrder.date}
                onClose={closeModal}
                reviewSubmitted={reviewSubmitted} // Pasar la propiedad reviewSubmitted
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CardsOrders;
