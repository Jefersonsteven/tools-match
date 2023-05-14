"use client"

import React from "react";
import style from "./form.module.css"

function UserForm({editingUser, handleSubmit, setEditingUser}) {

  const handleClick = (e) => {
    e.stopPropagation();
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
       />
  <label className={style.label}htmlFor="lastname">Apellido:</label>
  <input className={style.input}
         type="text"
         id="lastname"
         name="lastname"
         defaultValue={editingUser.lastname}
       />
  <label className={style.label} htmlFor="email">Email:</label>
  <input className={style.input}
         type="text"
         id="email"
         name="email"
         defaultValue={editingUser.email}
       />
  <label className={style.label} htmlFor="phonenumber">Telefono:</label>
  <input className={style.input}
         type="text"
         id="phonenumber"
         name="phonenumber"
         defaultValue={editingUser.phoneNumber}
       />
  <label className={style.label} htmlFor="reports">Reports:</label>
  <input className={style.input}
         type="text"
         id="reports"
         name="reports"
         defaultValue={editingUser.reports}
       />
  <button type="submit">Guardar</button>
  <button type="button" onClick={() => setEditingUser(null)}>
  Cancelar
  </button>
  </form>
  </>
  );
  }
  
  export default UserForm;