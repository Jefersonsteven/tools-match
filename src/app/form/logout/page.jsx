"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useState } from "react";
import { validate } from "../assets/validateSignUp";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
export default function Logout() {
  const [viewPwd, setViewPwd] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phoneNumber: "",
    flag: true,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setRegisterData({ ...registerData, [name]: value });
    setErrors(validate(registerData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">nombre</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          autoComplete="off"
        />
        <p
          className={errors.name.includes("✔️") ? styles.success : styles.error}
        >
          {errors.name && errors.name}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="surname">apellido</label>
        <input
          type="text"
          name="surname"
          onChange={handleChange}
          autoComplete="off"
        />
        <p
          className={
            errors.surname.includes("✔️") ? styles.success : styles.error
          }
        >
          {errors.surname && errors.surname}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="phoneNumber">celular</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          autoComplete="off"
        />
        <p className={styles.error}>
          {errors.phoneNumber && errors.phoneNumber}
        </p>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="">correo</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          autoComplete="off"
        />
        <p
          className={
            errors.email.includes("✔️") ? styles.success : styles.error
          }
        >
          {errors.email && errors.email}
        </p>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="">contraseña</label>
        <input
          type={viewPwd ? "text" : "password"}
          name="password"
          onChange={handleChange}
        />
        <p
          className={
            errors.password.includes("✔️") ? styles.success : styles.error
          }
        >
          {errors.password && errors.password}
        </p>
        <div className={styles.pwd} onClick={() => setViewPwd(!viewPwd)}>
          {viewPwd ? svgView : svgHide}
        </div>
      </div>
      <div>
        <label className={styles.label}>
          <input type="checkbox" name="test" value="test" />
          Términos y condiciones
        </label>
      </div>
      <div className={styles.submitContainer}>
        <button
          className={`${styles.buttonSubmit} ${
            errors.flag && styles.buttonSubmitDisabled
          }`}
          type="submit"
          disabled={errors.flag}
        >
          Registrarse
        </button>
        <Link href="">Términos y condiciones</Link>
      </div>
    </form>
  );
}
