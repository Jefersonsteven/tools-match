"use client";
import Link from "next/link";
import styles from "../form.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateLogIn } from "../assets/validateForms";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import { FcGoogle } from "react-icons//fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const provider = new GoogleAuthProvider();

export default function Login() {
  const router = useRouter();
  const { userSession, setUserSession } = useContext(AppContext);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      };
      let response = await fetch(
        `http://localhost:3000/api/loginValidate?email=${loginData.email}&password=${loginData.password}`,
        config
      );
      response = await response.json();

      console.log(response);

      console.log(response);
      if (response.status == 200) {
        router.push("/form/login");
        setUserSession(true);
      } else {
        throw new Error("no se obtuvo un 200");
      }
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
        setUserSession(true);
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
        <button className={`${styles.socialSignIn}`} onClick={callLoginGoogle}>
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
