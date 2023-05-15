"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserForm from "../../dashboard/components/Form";
import { pathname } from "next/navigation";
import { useParams } from "next/navigation";
import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";
import Swal from "sweetalert2";
import Modal from "../../dashboard/components/Modal";
import Cards from "@/components/Cards/Cards";

export default function PerfilUsuario() {
  const [editingUser, setEditingUser] = useState(null);
  const { perfilId } = useParams();
  const { userId } = useContext(AppContext);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      phoneNumber: formData.get("phonenumber"),
      reports: formData.get("reports"),
    };
    try {
      await axios.put(
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
    <div>
      <div className={styles.main_container}>
        <h1>
          <strong>{user.firstname}</strong>
        </h1>
        {userId === perfilId ? (
          <button className={styles.button_edit} onClick={handleEdit}>
            Editar Usuario
          </button>
        ) : (
          <button className={styles.button_report} onClick={handleReport}>
            Reportar Usuario
          </button>
        )}
        <h2>
          <strong>Apellido: </strong>
          {user.lastname}
        </h2>
        <h2>
          <strong>Teléfono: </strong>
          {user.phoneNumber}
        </h2>
        <h2>
          <strong>Email: </strong>
          {user.email}
        </h2>
        <h2>
          <strong>Ordenes: </strong>4
        </h2>
        {editingUser && (
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <UserForm
              editingUser={editingUser}
              handleSubmit={handleSubmit}
              setEditingUser={setEditingUser}
            />
          </Modal>
        )}
        <h2 className={styles.title_tienda}>Tienda</h2>
      </div>
      {userId === perfilId && (
        <>
          <Cards />
        </>
      )}
    </div>
  );
}
