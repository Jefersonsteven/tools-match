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

/* Sweetalert2 */
import Swal from "sweetalert2";

/* Helpers */
import { validateSignIn } from "../assets/validateForms";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import {
  callLoginGoogle,
  createNewUserOrLogIn,
} from "../assets/authWithGoogle";

import { submitSignUpFormData } from "../assets/formSubmit";
import Loader from "@/components/Loader/Loader";

export default function Logout() {
  const router = useRouter();
  const { setUserData, setUserId } = useContext(AppContext);
  const [viewPwd, setViewPwd] = useState(false);
  const [repeatViewPwd, setRepeatViewPwd] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [dataMessage, setDataMessage] = useState("");

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
    setFetchingData(true);
    try {
      setDataMessage("Creando cuenta en toolmatch...");
      await submitSignUpFormData(registerData, router);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear tu cuenta en ToolMatch",
        text: error,
        footer: "",
      });
    }
    setDataMessage("");
    setFetchingData(false);
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setFetchingData(true);
    try {
      setDataMessage("Autenticando con Google...");
      const userDataProvider = await callLoginGoogle();
      console.log(userDataProvider);
      await createNewUserOrLogIn(
        userDataProvider,
        setUserData,
        setUserId,
        router,
        setDataMessage
      );
    } catch (error) {
      console.log(error);
    }
    setFetchingData(false);
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
              className={styles.noArrows}
              type="number"
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
            <Link href="/terms" target="_blank">
              Términos y condiciones
            </Link>
          </label>
        </div>
        <div className={styles.submitContainer}>
          <button
            className={styles.buttonSubmit}
            disabled={
              errors.flag
                ? true
                : checkbox
                ? fetchingData
                  ? true
                  : false
                : true
            }
          >
            Registrarse
          </button>
          <span>|</span>
          <button
            className={`${styles.socialSignIn}`}
            onClick={handleAuth}
            disabled={fetchingData}
          >
            <span>Registrarse con</span> <FcGoogle className={styles.icon} />
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
    </>
  );
}
