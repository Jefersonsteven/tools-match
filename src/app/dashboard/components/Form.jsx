"use client"

import React from "react";
import style from "./form.module.css"
import { useState } from "react";

function UserForm({editingUser, handleSubmit, setEditingUser}) {

  const [error, setError] = useState("");


  const handleClick = (e) => {
    e.stopPropagation();
  };
  
  function validarNombre(evento) {
    const valor = evento.target.value;
    const campo = evento.target;
  
    if (!/^[a-zA-Z]+$/.test(valor)) {
      campo.classList.add('input-invalido');
    } else {
      campo.classList.remove('input-invalido');
    }
  }

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


  return (
  <>
  <form className={style.form} onClick={handleClick} onSubmit={handleSubmit}>
  <label className={style.label}htmlFor="firstname">Nombre:</label>
  <input className={style.input}
         type="text"
         id="firstname"
         name="firstname"
         defaultValue={editingUser.firstname}
         onBlur={validarNombre}
         pattern="^[a-zA-Z]{1,15}$"
         required
       />
  <label className={style.label}htmlFor="lastname">Apellido:</label>
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
       />
  <label className={style.label} htmlFor="reports">Rango:</label>
  <input className={style.input}
         type="text"
         id="admin"
         name="admin"
         defaultValue={editingUser.admin}
       />
       <label className={style.label} htmlFor="reports">HIDDEN:</label>
  <input className={style.input}
         type="text"
         id="admin"
         name="admin"
         defaultValue={editingUser.admin}
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