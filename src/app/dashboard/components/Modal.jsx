"use client"

import React from "react";
import style from "./Modal.module.css"

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className={style.modal}>
      <div className={style.modalOverlay}></div>
      <div className={style.modalContent}>
        {children}
      </div>
    </div>
  );
}

export default Modal;