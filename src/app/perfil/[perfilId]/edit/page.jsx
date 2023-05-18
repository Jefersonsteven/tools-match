"use client";

import { useContext, useState } from "react";
import styles from "./perfilForm.module.css";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const EditUser = () => {
  const { userData, setUserData, countries, newPetition } =
    useContext(AppContext);
  const { push } = useRouter();

  const [form, setForm] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    country: userData.country,
    zipCode: userData.zipCode,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      email: form.email,
      password: form.password,
    };

    try {
      let responseOfValidation = await newPetition(
        "PUT",
        "http://localhost:3000/api/loginValidate",
        body
      );

      if (!responseOfValidation.error) {
        let response = await newPetition(
          "PUT",
          `http://localhost:3000/api/user/${userData.email}`,
          form
        );
        console.log(response);
        if (!response.error) {
          setUserData(response);
          push(`perfil/${userData.id}`);
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Datos actualizados",
          });
        } else {
          throw new Error(response.error);
        }
      } else {
        throw new Error(responseOfValidation.error);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar datos",
        text: error,
        footer: "Intenta nuevamente",
      });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    push(`/perfil/${userData.id}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <div>
          <div className={styles.image}></div>
          <button className={styles.buttonSubmit}>Cambiar Imagen</button>
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.editUserDataForm} onSubmit={handleSubmit}>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="firstname">Nombre:</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="lastname">Apellido:</label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">Correo:</label>
              <input type="text" name="email" disabled value={form.email} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="phoneNumber">Celular:</label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber && form.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.selectContainer}>
              <label htmlFor="country">País donde resides actualmente:</label>

              <select
                id="country"
                name="country"
                defaultValue={form.country ? form.country : "null"}
                onChange={handleChange}
              >
                {Object.entries(countries).map(([property, value]) => {
                  return (
                    <option key={property} value={property}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="zipCode">Código postal</label>

              <input
                type="text"
                name="zipCode"
                value={form.zipCode && form.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Contraseña para aplicar cambios:</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonCancel} onClick={handleCancel}>
              Cancelar
            </button>
            <button className={styles.buttonSubmit} type="submit">
              Aplicar cambios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
