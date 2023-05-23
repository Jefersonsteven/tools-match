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
import { validateLogIn } from "../assets/validateForms";
import { svgView } from "../assets/viewPwd";
import { svgHide } from "../assets/hidePwd";
import { callLoginGoogle, getDataFromDB } from "../assets/authWithGoogle";
import { submitLogInFormData } from "../assets/formSubmit";
import Loader from "@/components/Loader/Loader";
import customAlert from "../assets/customAlert";

export default function Login() {
  const router = useRouter();
  const { setUserData, setUserId, saveInLocalStorage, form, setForm } =
    useContext(AppContext);

  const [fetchingData, setFetchingData] = useState(false);

  const [dataMessage, setDataMessage] = useState("");

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
    setFetchingData(true);
    setDataMessage("Enviando datos al servidor...");
    try {
      await submitLogInFormData(
        loginData,
        setUserData,
        setUserId,
        router,
        saveInLocalStorage,
        form,
        setForm,
        setDataMessage
      );
    } catch (error) {
      customAlert(5000, "bottom-end", "error", `${error}`);
    }
    setFetchingData(false);
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    setFetchingData(true);
    setDataMessage("Autenticando con Google...");
    try {
      const userDataProvider = await callLoginGoogle();
      setDataMessage("Obteniendo información...");
      await getDataFromDB(userDataProvider, setUserData, setUserId, router);
    } catch (error) {
      console.log(error);
    }
    setDataMessage("");
    setFetchingData(false);
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

      <div className={styles.submitContainer}>
        <button
          className={styles.buttonSubmit}
          disabled={errors.flag ? true : fetchingData ? true : false}
        >
          Iniciar sesión
        </button>
        <span>|</span>
        <button
          className={`${styles.socialSignIn}`}
          onClick={handleAuth}
          disabled={fetchingData}
        >
          <span>Iniciar con</span> <FcGoogle className={styles.icon} />
        </button>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/form/recover">Olvide mi contraseña</Link>
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
