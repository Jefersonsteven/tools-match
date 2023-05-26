"use client";
import Link from "next/link";
import styles from "../../form.module.css";
import { useEffect, useState } from "react";
import { validatePasswords } from "../../assets/validateForms";
import { useParams, useRouter } from "next/navigation";

import customAlert from "../../assets/customAlert";
import { newPetition } from "../../assets/petition";
import Loader from "@/components/Loader/Loader";

export default function Login() {
  const { email } = useParams();
  const { push } = useRouter();
  const [fetchingData, setFetchingData] = useState(false);
  const [dataMessage, setDataMessage] = useState("");
  const [form, setForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
    flag: true,
  });

  useEffect(() => {
    console.log(email);
    setErrors(validatePasswords(form));
  }, [form, email]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFetchingData(true);
    try {
      setDataMessage("Restaurando contraseña...");
      let setPassword = await newPetition(
        "PUT",
        `/api/forgetPassword/${email}`,
        { password: form.newPassword }
      );

      if (!setPassword.error) {
        customAlert(
          5000,
          "bottom-end",
          "success",
          "Contraseña cambiada con éxito"
        );

        setTimeout(() => {
          push("/form/login");
        }, 3000);
      } else {
        throw new Error(setPassword.error);
      }
    } catch (error) {
      console.log(error);
      customAlert(5000, "bottom-end", "error", "Error al cambiar contraseña");
    }
    setDataMessage("");
    setFetchingData(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.recover__message}>Restaurar contraseña</p>

      <div className={styles.inputContainer}>
        <label htmlFor="newPassword">Nueva Contraseña:</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />
        <p className={styles.errorRecover}>
          {errors.newPassword && errors.newPassword}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirmNewPassword">Repetir nueva contraseña:</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={form.confirmNewPassword}
          onChange={handleChange}
        />
        <p className={styles.errorRecover}>
          {errors.confirmNewPassword && errors.confirmNewPassword}
        </p>
      </div>
      <div className={styles.recover__submitContainer}>
        <button
          disabled={errors.flag ? errors.flag : fetchingData ? true : false}
          className={styles.recover__buttonSubmit}
        >
          Restaurar contraseña
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
