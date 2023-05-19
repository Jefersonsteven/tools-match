"use client";

import { useState } from "react";
import styles from "./changePassword.module.css";

const ChangePassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className={styles.section}>
      <form className={styles.formChangePassword} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Contraseña actual:</label>
          <input type="password" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Nueva contraseña:</label>
          <input type="password" />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Confirmar nueva contraseña:</label>
          <input type="password" />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSubmit} type="submit">
            Resetear contraseña
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
