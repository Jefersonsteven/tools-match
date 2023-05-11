"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validate } from "../assets/validateLogin";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";

export default function Login() {
  const router = useRouter();
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
    setErrors(validate(loginData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Entrando en try catch");
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      };
      const response = await fetch(
        `http://localhost:3000/api/loginValidate?email=${loginData.email}&password=${loginData.password}`,
        config
      );

      console.log(response);
      router.push("/");
    } catch (error) {
      console.error("Error en la solicitud POST", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="">CORREO</label>
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
        <label htmlFor="">CONTRASEÑA</label>
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
      <div className={styles.submitContainer}>
        <button
          className={`${styles.buttonSubmit} ${
            errors.flag && styles.buttonSubmitDisabled
          }`}
          type="submit"
          disabled={errors.flag}
        >
          Iniciar Sesión
        </button>
        <Link href="/form/recover">Olvide mi contraseña</Link>
      </div>
    </form>
  );
}
