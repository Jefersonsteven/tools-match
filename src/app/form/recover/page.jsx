"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useState } from "react";
import { validateLogIn } from "../assets/validateForms";

export default function Login() {
  const [viewPwd, setViewPwd] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    flag: true,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setLoginData({ ...loginData, [name]: value });
    setErrors(validateLogIn(loginData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.recover__message}>olvide mi contraseña</p>
      <div className={styles.inputContainer}>
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div className={styles.recover__submitContainer}>
        <Link href="/form/login" className={styles.recover__buttonCancel}>
          Cancelar
        </Link>
        <button className={styles.recover__buttonSubmit}>
          Recuperar contraseña
        </button>
      </div>
    </form>
  );
}
