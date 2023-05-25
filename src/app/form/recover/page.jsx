"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useEffect, useState } from "react";
import { validateEmailOnly } from "../assets/validateForms";

import customAlert from "../assets/customAlert";
import { newPetition } from "../assets/petition";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError(validateEmailOnly(email));
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = newPetition("POST", "api/sendEmail/resetPassword", {
        email,
      });
    } catch (error) {
      console.error(error);
      customAlert(
        5000,
        "bottom-end",
        "error",
        "",
        "Error al enviar mail de recuperación"
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.recover__message}>olvide mi contraseña</p>
      <div className={styles.inputContainer}>
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="off"
        />
        <p>{error && error}</p>
      </div>
      <div className={styles.recover__submitContainer}>
        <Link href="/form/login" className={styles.recover__buttonCancel}>
          Cancelar
        </Link>
        <button
          disabled={!email ? true : error ? true : false}
          className={styles.recover__buttonSubmit}
        >
          Recuperar contraseña
        </button>
      </div>
    </form>
  );
}
