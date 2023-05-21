"use client"

import React from "react";
import style from "./PublicationForm.module.css"
import { useState } from "react";

function PublicationForm({editingUser, handleSubmit, setEditingUser}) {

  const [error, setError] = useState("");


  const handleClick = (e) => {
    e.stopPropagation();
  };
  
//   function validarNombre(evento) {
//     const valor = evento.target.value;
//     const campo = evento.target;
  
//     if (!/^[a-zA-Z]+$/.test(valor)) {
//       campo.classList.add('input-invalido');
//     } else {
//       campo.classList.remove('input-invalido');
//     }
//   }

  function validarEdad(evento) {
    const valor = evento.target.value;
    const campo = evento.target;
  
    if (isNaN(valor)) {
      campo.classList.add('input-invalido');
    } else {
      campo.classList.remove('input-invalido');
    }
  }

  function validarEmail(evento) {
    const valor = evento.target.value;
    const campo = evento.target;
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      campo.classList.add('input-invalido');
    } else {
      campo.classList.remove('input-invalido');
    }
  }


  const handleSubmitForm = (e) => {
    e.preventDefault();

    // Verificar que no haya errores de validación antes de enviar el formulario
    if (error) {
      return;
    }

    handleSubmit(e);
  };

  const handleAdminChange = (e) => {
    setEditingUser({ ...editingUser, admin: e.target.value === "admin" });
  };



  return (
  <>
  <div className={style.contendorPadre}>
  <form className={style.form} onClick={handleClick} onSubmit={handleSubmit}>
  <label className={style.label}htmlFor="title">Titulo:</label>
  <input className={style.input}
         type="text"
         id="title"
         name="title"
         defaultValue={editingUser.title}
        //  onBlur={validarNombre}
        //  pattern="^[a-zA-Z]{1,15}$"
        //  required
       />
  {/* <label className={style.label}htmlFor="lastname">Apellido:</label>
  <input className={style.input}
         type="text"
         id="lastname"
         name="lastname"
         defaultValue={editingUser.lastname}
         onChange={validarNombre}
          pattern="^[a-zA-Z]{1,15}$"
          required
       />
  <label className={style.label} htmlFor="phonenumber">Telefono:</label>
  <input className={style.input}
         type="text"
         id="phonenumber"
         name="phonenumber"
         defaultValue={editingUser.phoneNumber}
         onBlur={validarEdad}
          pattern="^\d{1,15}$"
          maxLength={15}
          required
       /> */}
       {/* <label className={style.label} htmlFor="country">Pais:</label>
  <input className={style.input}
         type="text"
         id="country"
         name="country"
         defaultValue={editingUser.country}
       />
  <label className={style.label}>Rango:</label>
        <label className={style.checkboxLabel}>
          Admin:
          <input
            className={style.checkbox}
            type="radio"
            name="admin"
            value="admin"
            checked={editingUser.admin}
            onChange={handleAdminChange}
          />
        </label>
        <label className={style.checkboxLabel}>
          Usuario:
          <input
            className={style.checkbox}
            type="radio"
            name="admin"
            value="usuario"
            checked={!editingUser.admin}
            onChange={handleAdminChange}
          />
        </label> */}
  <button className={style.buttonGuardar} type="submit">Guardar</button>
  <button className={style.buttonCancelar}type="button" onClick={() => setEditingUser(null)}>
  Cancelar
  </button>
  </form>
  </div>
  </>
  );
  }
  
  export default PublicationForm;