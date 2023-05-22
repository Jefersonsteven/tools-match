"use client";

import { useContext, useEffect, useState } from "react";
import styles from "./changePassword.module.css";
import { IoCaretBack } from "react-icons/io5";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const {
    userId,
    setUserData,
    setUserId,
    newPetition,
    userData,
    endSession,
    removeFromLocalStorage,
  } = useContext(AppContext);
  const { push, back } = useRouter();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    flag: true,
  });

  useEffect(() => {
    setErrors(validateChangePassword(form));
  }, [form]);

  const validateChangePassword = (form) => {
    const passwordRegex = /^(?=.*[0-9]).{6,64}$/;
    let errors = { flag: false };
    if (!form.currentPassword) {
      errors.currentPassword = "La contraseña actual es requerida";
      errors.flag = true;
    }
    if (!form.newPassword) {
      errors.newPassword = "La nueva contraseña es requerida";
      errors.flag = true;
    }
    if (!form.confirmNewPassword) {
      errors.confirmNewPassword = "La confirmación es requerida";
      errors.flag = true;
    }
    if (form.newPassword !== form.confirmNewPassword) {
      errors.confirmNewPassword = "Las contraseñas no coinciden";
      errors.flag = true;
    }
    if (!passwordRegex.test(form.newPassword)) {
      errors.newPassword =
        "La contraseña debe tener al menos 6 caracteres y al menos un número";
      errors.flag = true;
    }

    return errors;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      email: userData.email,
      password: form.currentPassword,
    };

    try {
      let validatePassword = await newPetition(
        "PUT",
        "/api/loginValidate",
        body
      );
      console.log(validatePassword);

      if (!validatePassword.error) {
        let setPassword = await newPetition(
          "PUT",
          `/api/forgetPassword/${userData.email}`,
          { password: form.newPassword }
        );
        console.log(setPassword);
        if (!setPassword.error) {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Contraseña actualizada correctamente, se cerrara la sesión",
          });

          setTimeout(() => {
            push("/form/login");
            removeFromLocalStorage("id");
            removeFromLocalStorage("token");
            endSession(userData.email);
            setUserData(null);
            setUserId(null);
          }, 5000);
        } else {
          throw new Error(setPassword.error);
        }
      } else {
        throw new Error(validatePassword.error);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar contraseña",
        text: error,
        footer: "Intenta nuevamente",
      });
    }
  };

  function handleBack() {
    back();
  }

  return (
    <>
      <div onClick={handleBack} className={styles.backContainer}>
        <div className={styles.back}>
          <IoCaretBack size={50} color="var(--white)" />
        </div>
        <h3>Volver</h3>
      </div>
      <section className={styles.section}>
        <form className={styles.formChangePassword} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Contraseña actual:</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
            />
            <p>{errors.currentPassword && errors.currentPassword}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="newPassword">Nueva contraseña:</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
            <p>{errors.newPassword && errors.newPassword}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmNewPassword">
              Confirmar nueva contraseña:
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
            />
            <p>{errors.confirmNewPassword && errors.confirmNewPassword}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.buttonSubmit}
              disabled={errors.flag}
              type="submit"
            >
              Resetear contraseña
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ChangePassword;
