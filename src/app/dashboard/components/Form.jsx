"use client"

import React, { useState, useEffect } from "react";
import style from "./form.module.css"

const Form = ({ onClose, onSave, user, fakeUser }) => {
    const [name, setName] = useState(user && user.name ? user.name : '');
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
  
    const handleSave = (event) => {
        event.preventDefault();
        if (window.confirm('¿Estás seguro que quieres guardar los cambios?')) {
          onSave({ name, phone, email, username });
          console.log("bien nene");
        }
    };

    useEffect(() => {
        setName(fakeUser.name);
        setPhone(fakeUser.phone);
        setEmail(fakeUser.email);
        setUsername(fakeUser.username);
      }, [fakeUser]);


    return (
      <div className={style.formContainer}>
        <div className={style.formHeader}>
          <h2>{user.id ? "Editar Usuario" : "Agregar Usuario"}</h2>
          <button className={style.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className={style.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="phone">Teléfono:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="username">Nombre de usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className={style.formGroup}>
            <button className={style.submitButton} type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Form;