"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useEffect, useState } from "react";
import { validateSignIn } from "../assets/validateForms";
import { useRouter } from "next/navigation";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import { FcGoogle } from "react-icons//fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";

const provider = new GoogleAuthProvider();

export default function Logout() {
  const router = useRouter();

  const [viewPwd, setViewPwd] = useState(false);

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
      console.log("Entrando en try catch");
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: registerData.name,
          lastname: registerData.surname,
          email: registerData.email,
          password: registerData.password,
          phoneNumber: registerData.phoneNumber,
        }),
      };
      const response = await fetch(
        "http://localhost:3000/api/registerUser",
        config
      );

      console.log(response);

      console.log(response);
      response.status == 200
        ? router.push("/")
        : new Error("no se obtuvo un 200");
    } catch (error) {
      console.error("Error en la solicitud POST", error);
    }
  };

  const callLoginGoogle = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        const user = result.user;
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const uid = user.uid;
        const providerData = user.providerData;

        console.log("Nombre completo:", displayName);
        console.log("Correo electrónico:", email);
        console.log("URL de la foto de perfil:", photoURL);
        console.log("UID del usuario:", uid);
        console.log("Datos del proveedor de identidad:", providerData);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
              type={viewPwd ? "text" : "passwordRepeat"}
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
            <div className={styles.pwd} onClick={() => setViewPwd(!viewPwd)}>
              {viewPwd ? svgView : svgHide}
            </div>
          </div>
        </div>
        <div>
          <label className={styles.label}>
            <input type="checkbox" name="test" value="test" />
            <Link href="">Términos y condiciones</Link>
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
          <span>|</span>
          <button
            className={`${styles.socialSignIn}`}
            onClick={callLoginGoogle}
          >
            Iniciar con
            <FcGoogle className={styles.icon} />
          </button>
        </div>
      </form>
    </>
  );
}