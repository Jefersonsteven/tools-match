"use client";

import { useContext, useState } from "react";
import styles from "./perfilForm.module.css";
import { AppContext } from "@/context/AppContext";

const EditUser = () => {
  const { userData, setUserData } = useContext(AppContext);

  const [form, setForm] = useState({ ...userData });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    let response = await fetch(
      `http://localhost:3000/api/user/${userData.email}`,
      config
    );
    let data = await response.json();
    console.log(data);
    setUserData(data);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm({ ...form, [name]: value });
  };

  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>
        <button>Cambiar Imagen</button>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.editUserDataForm} onSubmit={handleSubmit}>
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
            <label htmlFor="">Apellido:</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Correo:</label>
            <input type="text" disabled value={form.email} />
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
          {/*  <div className={styles.inputContainer}>
            <label htmlFor="">Dirección</label>
            <input type="text" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div> */}

          <div>
            <button>Cancelar</button>
            <button type="submit">Aplicar cambios</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
