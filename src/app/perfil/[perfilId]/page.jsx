"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useParams } from "next/navigation";
import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";
import Swal from "sweetalert2";

import Link from "next/link";

export default function PerfilUsuario() {
  const [editingUser, setEditingUser] = useState(null);
  const { perfilId } = useParams();
  const { userId, userData, countries } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/admin/user/${perfilId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [perfilId]);

  const handleEdit = () => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleReport = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres reportar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Reportar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "¡Usuario reportado!",
          "El usuario ha sido reportado con éxito.",
          "success"
        );
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      phoneNumber: formData.get("phonenumber"),
      reports: formData.get("reports"),
    };

    Swal.fire({
      title: "¿Estás seguro de los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:3000/api/admin/user/${editingUser.id}`,
            updatedUser
          )
          .then((response) => {
            console.log(response.data);
            setEditingUser(null);
            Swal.fire({
              title: "¡Usuario editado correctamente!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    try {
      axios.put(
        `http://localhost:3000/api/admin/user/${editingUser.id}`,
        updatedUser
      );
      console.log("User updated in DB");
      fetch(`http://localhost:3000/api/admin/user/${perfilId}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
      setEditingUser(null);
      Swal.fire({
        title: "Cambiado con éxito!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.userContainer}>
          <div className={styles.userDataContainer}>
            <div className={styles.image}></div>
            <div>
              <h2>
                <strong>Usuario: </strong>@example23
              </h2>
              <h2>
                <strong>Nombre completo: </strong>
                {`${userData.firstname} ${userData.lastname}`}
              </h2>
              <h2>
                <strong>Correo: </strong>
                {userData.email}
              </h2>
              <h2>
                <strong>País de residencia: </strong>
                {userData.country ? countries[userData.country] : "---"}
              </h2>
              <h2>
                <strong>Código postal: </strong>
                {userData.zipCode ? userData.zipCode : "---"}
              </h2>
              <h2>
                <strong>Celular: </strong>
                {userData.phoneNumber ? userData.phoneNumber : "---"}
              </h2>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Link href={`perfil/${userId}/edit`} className={styles.editButton}>
              Editar datos
            </Link>
            <Link
              href={`perfil/${userId}/changePassword`}
              className={styles.editButton}
            >
              Seguridad
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
