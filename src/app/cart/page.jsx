"use client";

import { useState, useContext } from "react";
import Modal from "react-modal";
import { AppContext } from "@/context/AppContext";
import styles from "./cart.module.css";
import { IoCaretBack } from "react-icons/io5";
import Link from "next/link";

Modal.setAppElement(null);

function Cart() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { postDetail, setPostDetail, userId } = useContext(AppContext);
  const pd = postDetail;

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addToCart = () => {
    setCartItems([...cartItems, pd]);
    closeModal();
  };

  return (
    <div className={styles.main_container}>
      {/* Resto del código */}
      <section className={styles.section_button}>
        {userId === pd?.author?.id && <button>Eliminar</button>}
        {userId !== pd?.author?.id && pd.type === "SALE" && (
          <button onClick={openModal}>Comprar</button>
        )}
        {userId !== pd?.author?.id && pd.type === "RENTAL" && (
          <button>Arrendar</button>
        )}
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cart Modal"
        className={styles.modal}
      >
        <h2>En construcción</h2>
        <p>Este feature aún está en desarrollo.</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default Cart;
