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
import { validateSignIn } from "../assets/validateForms";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import { callLoginGoogle } from "../assets/authWithGoogle";
import { newPetition } from "../assets/petition";
import generatePassword from "../assets/passwordGenerator";

import Swal from "sweetalert2";

export default function Logout() {
  const router = useRouter();
  const { setUserSession, setUserData } = useContext(AppContext);
  const [viewPwd, setViewPwd] = useState(false);
  const [repeatViewPwd, setRepeatViewPwd] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordRepeat: "",
    flag: true,
  });

  useEffect(() => {
    setErrors(validateSignIn(registerData));
  }, [registerData]);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataBody = {
        firstname: registerData.name,
        lastname: registerData.surname,
        email: registerData.email,
        password: registerData.password,
        phoneNumber: registerData.phoneNumber,
      };

      let data = await newPetition(
        "POST",
        "http://localhost:3000/api/registerUser",
        dataBody
      );

      if (data.newUser) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tu cuenta ha sido creada, redirigiendo hacia el logIn",
          showConfirmButton: false,
          timer: 3000,
        });

        setTimeout(() => {
          router.push("/form/login");
        }, 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear tu cuenta en ToolMatch",
        text: error,
        footer: "",
      });
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    const userDataProvider = await callLoginGoogle();
    let dbUserData = null;
    let password = generatePassword();

    const dataBody = {
      ...userDataProvider,
      password,
    };

    dbUserData = await newPetition(
      "GET",
      `http://localhost:3000/api/user/${userDataProvider.email}`,
      false
    );

    if (!dbUserData) {
      await newPetition("POST", "http://localhost:3000/api/user", dataBody);
      dbUserData = await newPetition(
        "GET",
        `http://localhost:3000/api/user/${userDataProvider.email}`,
        false
      );
    }

    setUserData(dbUserData);
    Swal.fire({
      title: `Bienvenido ${dbUserData.firstname} ${dbUserData.lastname}`,
      showConfirmButton: false,
      timer: 1500,
    });
    setUserSession(true);

    setTimeout(() => {
      router.push("/form/login");
    }, 3000);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">nombre*</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              autoComplete="off"
            />
            <p
              className={
                errors.name.includes("✔️") ? styles.success : styles.error
              }
            >
              {errors.name && errors.name}
            </p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="surname">apellido *</label>
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
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="phoneNumber">celular *</label>
            <input
              type="text"
              name="phoneNumber"
              onChange={handleChange}
              autoComplete="off"
            />
            <p
              className={
                errors.phoneNumber.includes("✔️")
                  ? styles.success
                  : styles.error
              }
            >
              {errors.phoneNumber && errors.phoneNumber}
            </p>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="email">correo *</label>
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
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="">contraseña *</label>
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
          <div className={styles.inputContainer}>
            <label htmlFor="passwordRepeat">confirmar contraseña *</label>
            <input
              type={repeatViewPwd ? "text" : "password"}
              name="passwordRepeat"
              onChange={handleChange}
            />
            <p
              className={
                errors.passwordRepeat.includes("✔️")
                  ? styles.success
                  : styles.error
              }
            >
              {errors.passwordRepeat && errors.passwordRepeat}
            </p>
            <div
              className={styles.pwd}
              onClick={() => setRepeatViewPwd(!repeatViewPwd)}
            >
              {repeatViewPwd ? svgView : svgHide}
            </div>
          </div>
        </div>
        <div>
          <label className={styles.label}>
            <input
              type="checkbox"
              name="checkbox"
              value={checkbox}
              onClick={() => setCheckbox(!checkbox)}
            />
            <Link href="/" target="_blank">
              Términos y condiciones
            </Link>
          </label>
        </div>
        <div className={styles.submitContainer}>
          <button
            className={`${styles.buttonSubmit} ${
              errors.flag
                ? styles.buttonSubmitDisabled
                : !checkbox && styles.buttonSubmitDisabled
            }`}
            type="submit"
            disabled={errors.flag}
          >
            Registrarse
          </button>
          <span>|</span>
          <button className={`${styles.socialSignIn}`} onClick={handleAuth}>
            Iniciar con
            <FcGoogle className={styles.icon} />
          </button>
        </div>
      </form>
    </>
  );
}
