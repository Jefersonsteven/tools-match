"use client"

import React from "react";
import style from "./form.module.css"
import { useState } from "react";

function UserForm({editingUser, handleSubmit, setEditingUser}) {

  const [error, setError] = useState("");


  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación del input "firstname"
    if (name === "firstname") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        setError("El nombre solo puede contener letras");
      } else {
        setError("");
      }
    }

    // Validación del input "lastname"
    if (name === "lastname") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        setError("El apellido solo puede contener letras");
      } else {
        setError("");
      }
    }

    // Validación del input "email"
    if (name === "email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        setError("El email no es válido");
      } else {
        setError("");
      }
    }

    // Validación del input "phonenumber"
    if (name === "phonenumber") {
      if (!/^\d{1,15}$/.test(value)) {
        setError("El teléfono solo puede contener números");
      } else {
        setError("");
      }
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Verificar que no haya errores de validación antes de enviar el formulario
    if (error) {
      return;
    }

    handleSubmit(e);
  };


  return (
  <>
  <form className={style.form} onClick={handleClick} onSubmit={handleSubmit}>
  <label className={style.label}htmlFor="firstname">Nombre:</label>
  <input className={style.input}
         type="text"
         id="firstname"
         name="firstname"
         defaultValue={editingUser.firstname}
         onChange={handleInputChange}
         pattern="^[a-zA-Z]{1,15}$"
         required
       />
  <label className={style.label}htmlFor="lastname">Apellido:</label>
  <input className={style.input}
         type="text"
         id="lastname"
         name="lastname"
         defaultValue={editingUser.lastname}
         onChange={handleInputChange}
          pattern="^[a-zA-Z]{1,15}$"
          required
       />
  <label className={style.label} htmlFor="email">Email:</label>
  <input className={style.input}
         type="text"
         id="email"
         name="email"
         defaultValue={editingUser.email}
         onChange={handleInputChange}
         maxLength={15}
         required
       />
  <label className={style.label} htmlFor="phonenumber">Telefono:</label>
  <input className={style.input}
         type="text"
         id="phonenumber"
         name="phonenumber"
         defaultValue={editingUser.phoneNumber}
         onChange={handleInputChange}
          pattern="^\d{1,15}$"
          maxLength={15}
          required
       />
  <label className={style.label} htmlFor="reports">Ordenes:</label>
  <input className={style.input}
         type="text"
         id="reports"
         name="reports"
         defaultValue="4"
       />
  <button className={style.buttonGuardar} type="submit">Guardar</button>
  <button className={style.buttonCancelar}type="button" onClick={() => setEditingUser(null)}>
  Cancelar
  </button>
  </form>
  </>
  );
  }
  
  export default UserForm;