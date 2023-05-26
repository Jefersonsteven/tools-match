"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useEffect, useState } from "react";
import { validateEmailOnly } from "../assets/validateForms";
import customAlert from "../assets/customAlert";
import { newPetition } from "../assets/petition";
import Loader from "@/components/Loader/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const [dataMessage, setDataMessage] = useState("");

  useEffect(() => {
    setError(validateEmailOnly(email));
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFetchingData(true);
    try {
      setDataMessage("Enviando correo de recuperación...");
      const response = await newPetition(
        "POST",
        "/api/sendEmail/resetPassword",
        {
          email,
        }
      );
      console.log(response);
      if (response.Error)
        throw new Error(
          response.Error || "Error al enviar mail de recuperación"
        );
      customAlert(
        8000,
        "bottom-end",
        "success",
        `Se ha enviado un mail de recuperación a ${email}`
      );
    } catch (error) {
      console.error(error);
      customAlert(
        5000,
        "bottom-end",
        "error",
        "Error al enviar mail de recuperación:" + error.message
      );
    }
    setDataMessage("");
    setFetchingData(false);
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
        <p className={styles.errorRecover}>{error && error}</p>
      </div>
      <div className={styles.recover__submitContainer}>
        <Link href="/form/login" className={styles.recover__buttonCancel}>
          Cancelar
        </Link>
        <button
          disabled={!email ? true : error ? true : fetchingData ? true : false}
          className={styles.recover__buttonSubmit}
        >
          Recuperar contraseña
        </button>
      </div>
      <div className={styles.loaderContainer}>
        {fetchingData && (
          <>
            <Loader />
            <p>{dataMessage && dataMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
