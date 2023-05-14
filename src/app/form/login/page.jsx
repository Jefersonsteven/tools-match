"use client";
import styles from "../form.module.css";

/* React */
import { useContext } from "react";
import { useEffect, useState } from "react";

/* NextJs */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons//fc";
import { AppContext } from "@/context/AppContext";

/* Helpers */
import { validateLogIn } from "../assets/validateForms";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import { callLoginGoogle } from "../assets/authWithGoogle";
import { newPetition } from "../assets/petition";
import generatePassword from "../assets/passwordGenerator";

export default function Login() {
  const router = useRouter();
  const { setUserSession, setUserData } = useContext(AppContext);
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
    /* Email http://localhost:3000/api/user/email => del input 
      Guardar en un estado (Context)
    */
    try {
      const dataBody = {
        email: loginData.email,
        password: loginData.password,
      };

      await newPetition(
        "PUT",
        "http://localhost:3000/api/loginValidate",
        dataBody
      );

      let data = await newPetition(
        "GET",
        `http://localhost:3000/api/user/${loginData.email}`,
        false
      );

      console.log(data);
      console.log(data.logged);

      if (data.logged) {
        router.push("/home");
        setUserData(data);
        setUserSession(true);
      }
    } catch (error) {
      console.error("Error en la solicitud POST", error);
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    const userDataProvider = await callLoginGoogle();
    let userData = null;
    let password = generatePassword();

    const dataBody = {
      ...userDataProvider,
      password,
    };

    /*  await newPetition("POST", "http://localhost:3000/api/user", dataBody); */

    userData = await newPetition(
      "GET",
      `http://localhost:3000/api/user/${userDataProvider.email}`,
      false
    );

    if (!userData) {
      await newPetition("POST", "http://localhost:3000/api/user", dataBody);
      userData = await newPetition(
        "GET",
        `http://localhost:3000/api/user/${userDataProvider.email}`,
        false
      );
    }

    setUserData(userData);
    router.push("/home");
    setUserSession(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Correo</label>
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
        <label htmlFor="password">Contraseña</label>
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
        <button className={`${styles.socialSignIn}`} onClick={handleAuth}>
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
