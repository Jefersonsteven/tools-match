"use client"

import React, { useContext } from "react";
import style from "./form.module.css"
import { useState } from "react";
import { AppContext } from "@/context/AppContext";

function UserForm({editingUser, handleSubmit, setEditingUser, admin, setAdmin}) {

  const {countries} = useContext(AppContext)

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

 




  const handleAdminChange = (e) => {
    if(editingUser.admin === true)
    setEditingUser({...editingUser, admin: false })
    else setEditingUser({...editingUser, admin: true });
  };








  return (
  <>
  <div className={style.contendorPadre}>
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
       <label className={style.label} htmlFor="country">País:</label>
       <select
  className={style.input}
  id="country"
  name="country"
  defaultValue={editingUser.country} // Asegúrate de que el valor de `editingUser.country` sea el código de país, por ejemplo "AR"
  onChange={(e) => {
    const countryCode = e.target.value;
    setEditingUser({ ...editingUser, country: countryCode });
  }}
>
  {Object.entries(countries).map(([countryCode, countryName]) => (
    <option key={countryCode} value={countryCode}>
      {countryName}
    </option>
  ))}
</select>






<label className={style.label}>Rango:</label>
<label className={style.checkboxLabel}>
  Admin:
  <input
    className={style.checkbox}
    type="checkbox" // Cambiado a radio
    name="admin"
    checked={editingUser.admin}
    onChange={handleAdminChange}
  />
</label>














   <div className={style.contenedorbotones}>
  <button className={style.buttonCancelar}type="button" onClick={() => setEditingUser(null)}>
  Cancelar
  </button>
  <button className={style.buttonGuardar} type="submit">Guardar</button>
  </div>
  </form>
  </div>
  </>
  );
  }
  
  export default UserForm;