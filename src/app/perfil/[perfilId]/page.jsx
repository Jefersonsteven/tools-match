"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useParams } from "next/navigation";
import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";
import Swal from "sweetalert2";

import Link from "next/link";
import CardsReview from "@/components/CardsReview";
import CardsOrders from "@/components/CardsOrders";

export default function PerfilUsuario() {
  const [editingUser, setEditingUser] = useState(null);
  const { perfilId } = useParams();
  const { userId, userData, countries } = useContext(AppContext);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  const mockReviews = [
    {
      id: 1,
      authorId: 1,
      rating: 4,
      content: "Recomiendo a Celes, se nota que es una persona honesta y es muy amable. Le bajo un punto porque no admite pago por mercado pago, solo efectivo",
    },
    {
      id: 2,
      authorId: 2,
      rating: 5,
      content: "Arrende la cortadora de cesped y no andaba muy bien, me devolvio mi dinero",
    },
    {
      id: 3,
      authorId: 3,
      rating: 1,
      content: "Arrende la amoladora, nunca me la trajo, todavia estoy esperando",
    },
    {
      id: 4,
      authorId: 4,
      rating: 5,
      content: "Le compre el set de jardineria, todo bien.",
    },
  ];
  
  const mockAuthors = {
    1: {
      id: 1,
      name: "Juan",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwreugxnlmImJ5PTfcUCyRaeebl3dFILAlQ&usqp=CAU",
    },
    2: {
      id: 2,
      name: "María",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_uNbufEmwkBM0nI0Rikxewub7z9gIGWHDDtiOweMRx58IUe_qZnDSwrqVHJwElifZU&usqp=CAU",
    },
    3: {
      id: 3,
      name: "Pedro",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQywX3xEBz6HuunsE0XJeTMXdEeL4EChAo4A&usqp=CAU",
    },
    4: {
      id: 4,
      name: "Laura",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmp9uWxwev84Uff5D80j1aCBuZUDVMeKRKFN0A4X12mH_BZmW7ULcpqThqTSitTS46kz8&usqp=CAU",
    },
  };

  

  useEffect(() => {
    fetch(`/api/admin/user/${perfilId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log(data)
      })

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
        axios.put(`/api/admin/user/${editingUser.id}`, updatedUser)
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
        `/api/admin/user/${editingUser.id}`,
        updatedUser
      );
      console.log("User updated in DB");
      fetch(`/api/admin/user/${perfilId}`)
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

  const [authors, setAuthors] = useState({});

  useEffect(() => {
    const authorIds = [...new Set(userData.received.map((review) => review.authorId))];

    const fetchAuthors = async () => {
      try {
        const responses = await Promise.all(
          authorIds.map((authorId) =>
            axios.get(`http://localhost:3000/api/admin/user/${authorId}`)
          )
        );

        const fetchedAuthors = responses.reduce((authorsMap, response) => {
          const author = response.data;
          return { ...authorsMap, [author.id]: author };
        }, {});

        setAuthors(fetchedAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, [user.received]);


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
      <div className="flex gap-4">
      <div className="w-2/3">
        <CardsReview reviews={mockReviews} authors={mockAuthors} />
      </div>
      <div className="w-1/3">
        <CardsOrders />
      </div>
    </div>
    </>
  );
}
