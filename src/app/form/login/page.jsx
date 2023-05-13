"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateLogIn } from "../assets/validateForms";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import { FcGoogle } from "react-icons//fc";

import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { callLoginGoogle } from "../assets/authWithGoogle";

export default function Login() {
  const router = useRouter();
  const { setUserSession } = useContext(AppContext);
  const [viewPwd, setViewPwd] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    flag: true,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    setErrors(validateLogIn(loginData));
  }, [loginData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Entrando en try catch");
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      };
      let response = await fetch(
        `http://localhost:3000/api/loginValidate`,
        config
      );
      response = await response.json();

      console.log(response);

      if (response.Message === "Has iniciado sesión") {
        router.push("/home");
        setUserSession(true);
      }
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

        <div className={styles.pwdInLogin} onClick={() => setViewPwd(!viewPwd)}>
          {viewPwd ? svgView : svgHide}
        </div>
      </div>
      <div className={styles.sessionCheckboxContainer}>
        <label className={styles.label}>
          <input type="checkbox" name="test" value="test" />
          Mantener Sesión
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
          Iniciar sesión
        </button>
        <span>|</span>
        <button
          className={`${styles.socialSignIn}`}
          onClick={(event) => callLoginGoogle(event, router, setUserSession)}
        >
          Iniciar con
          <FcGoogle className={styles.icon} />
        </button>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/form/recover">Olvide mi contraseña</Link>
      </div>
    </form>
  );
}
