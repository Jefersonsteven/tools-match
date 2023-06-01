"use client";

import { useState, useContext, useEffect } from "react";
import Card from "@/components/Cards/Card";

import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import CardsReview from "@/components/Reviews/CardsReview";
import CardsCreatedReviews from "@/components/Reviews/CardsCreatedReviews";
import CardsOrders from "@/components/Reviews/CardsOrders";
import axios from "axios";
import Modal from "react-modal";
import Back from "@/components/back/Back";
import LoaderRadial from "@/components/Loader/LoaderRadial";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";

export default function PerfilUsuario() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { push } = useRouter();
  const { perfilId } = useParams();
  const [reportMessagges, setReportMessagges] = useState("");
  const { userId, userData, countries } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [createdReviews, setCreatedReviews] = useState([]);
  const [user, setUser] = useState({});
  const [authors, setAuthors] = useState({});
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${perfilId}`);

        const receivedReviews = response.data.received.filter(
          (review) => review.hidden === false
        );
        setUser(response.data);
        setReviews(receivedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [userId, perfilId]); // Agregar createdReviews como dependencia

  useEffect(() => {
    const fetchCreatedReviews = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${perfilId}`);

        const createdReviews = response.data.reviews.filter(
          (review) => review.hidden === false
        );
        setUser(response.data);
        setCreatedReviews(createdReviews);
      } catch (error) {
        console.error("Error fetching createdReviews:", error);
      }
    };
    fetchCreatedReviews();
  }, [perfilId]); // Agregar reviews como dependencia

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorIds = [
          ...new Set(reviews.map((review) => review.authorId)),
        ];

        const fetchedAuthors = await Promise.all(
          authorIds.map((authorId) => axios.get(`/api/admin/user/${authorId}`))
        );

        setAuthors(fetchedAuthors.map((response) => response.data)); // Convertir la respuesta en un array de datos
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, [reviews]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${userId}`);
        const userData = response.data;
        const orders = userData.orders || [];

        const orderDetailsPromises = orders.map(async (order) => {
          const qItems = order.postId.length;
          const postId = order.postId;
          const date = order.createdAt;
          const paymentId = order.paymentId;
          const paymentResponse = await axios.get(`/api/payment/${paymentId}`);
          const paymentDetails = paymentResponse.data;
          return {
            ...order,
            qItems: qItems,
            amount: paymentDetails.payment.amount,
            currency: paymentDetails.payment.currency,
            date: date,
            postId: postId,
          };
        });

        const orderDetails = await Promise.all(orderDetailsPromises);
        setUserOrders(orderDetails);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [userId]);

  useEffect(() => {
    !userData && push("/form/login");
  }, [userData, push]);

  const handleReviewUpdate = async (updatedReview) => {
    try {
      const response = await axios.put(`/api/review/${updatedReview.id}`, {
        rating: updatedReview.rating,
        content: updatedReview.content,
      });

      if (response.status === 200) {
        console.log("Reseña actualizada correctamente");
        // Actualizar el estado de las revisiones
        const updatedReviews = reviews.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        );
        setReviews(updatedReviews);
      } else {
        console.error("Error al actualizar la reseña");
      }
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      // Realiza la lógica necesaria para eliminar la reseña del estado createdReviews
      const response = await axios.delete(`/api/admin/review/${reviewId}`);

      if (response.status === 200) {
        console.log("Reseña eliminada correctamente");
        const updatedReviews = createdReviews.filter(
          (review) => review.id !== reviewId
        );
        setCreatedReviews(updatedReviews);
      } else {
        console.error("Error al eliminar la reseña");
      }
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const reportSubmit = async () => {
    setModalIsOpen(false);
    try {
      let config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          reason: `Autor del reporte: ${userData.firstname} ${userData.lastname} \n\n Razón del reporte: ${reportMessagges}`,
        }),
      };

      let response = await fetch("/api/admin/report", config);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
          toast.style.fontSize = "16px";
        },
      });

      Toast.fire({
        icon: "success",
        title: "Reporte enviado correctamente.",
      });
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
          toast.style.fontSize = "16px";
        },
      });

      Toast.fire({
        icon: "error",
        title: "Error al enviar el reporte. Intenta nuevamente",
      });
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <Back />
        {!user.firstname && (
          <div className="grid justify-center items-center fixed w-screen h-3/6">
            <LoaderRadial />
          </div>
        )}

        {user.firstname && (
          <>
            <h2 className={styles.sectionTitle}>Perfil de toolmatch</h2>
            <section className={styles.section}>
              <div className={styles.imageContainer}>
                <Image
                  src={user.photo ? user.photo : "/assets/userPhotoDefault.png"}
                  width={254}
                  height={254}
                  alt="Uploaded"
                />
              </div>
              <h3 className={styles.dataTitle}>Datos de la cuenta</h3>
              <div className={styles.profileCard}>
                <div className={styles.profileCard__Date}>
                  <p>Usuario:</p>
                  <p>{`@${user.firstname}`}</p>
                </div>
                <div className={styles.profileCard__Date}>
                  <p>Email de tu cuenta Toolmatch:</p>
                  <p>{`${user.email}`}</p>
                </div>
              </div>
              <h3 className={styles.dataTitle}>Datos personales</h3>
              <div className={styles.profileCard}>
                <div className={styles.profileCard__Date}>
                  <p>Nombre completo:</p>
                  <p>{`${user.firstname} ${user.lastname}`}</p>
                </div>
                <div className={styles.profileCard__Date}>
                  <p>País de residencia:</p>
                  <p> {user.country ? countries[user.country] : "---"}</p>
                </div>
                <div className={styles.profileCard__Date}>
                  <p>Provincia:</p>
                  <p> {user.province ? user.province : "---"}</p>
                </div>
                <div className={styles.profileCard__Date}>
                  <p>Ciudad:</p>
                  <p> {user.city ? user.city : "---"}</p>
                </div>
                <div className={styles.profileCard__Date}>
                  <p>Código postal:</p>
                  <p> {user.zipCode ? user.zipCode : "---"}</p>
                </div>
                <div className={styles.profileCard__Date}>
                  <p>Número de teléfono:</p>
                  <p> {user.phoneNumber ? user.phoneNumber : "---"}</p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {userId === perfilId ? (
                  <Link
                    href={`perfil/${userId}/edit`}
                    className={styles.editButton}
                  >
                    Editar perfil
                  </Link>
                ) : (
                  <button className={styles.editButton} onClick={openModal}>
                    Reportar usuario
                  </button>
                )}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className={styles.customModal}
                  overlayClassName={styles.customOverlay}
                  contentLabel="Purchased Items Modal"
                >
                  {modalIsOpen && (
                    <>
                      <div className={styles.modalheader}>
                        <div className={styles.modaltitle}>
                          <h2>Reportar usuario</h2>
                        </div>
                        <AiFillCloseCircle
                          size={25}
                          color="var(--red)"
                          onClick={closeModal}
                          className={styles.modalbuttonClose}
                        />
                      </div>
                      <form onSubmit={reportSubmit}>
                        <div className="flex flex-col mb-8">
                          <label htmlFor="email">Tú Email:</label>
                          <input
                            name="email"
                            type="email"
                            disabled
                            value={userData.email}
                          />
                        </div>
                        <div className="flex flex-col mb-8">
                          <label htmlFor="rason">Motivo del reporte:</label>
                          <textarea
                            name="rason"
                            type="text"
                            value={reportMessagges}
                            onChange={(event) =>
                              setReportMessagges(event.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <button>enviar reporte</button>
                        </div>
                      </form>
                    </>
                  )}
                </Modal>
              </div>
            </section>
            <div className={`${styles.titlesSections} justify-center`}>
              <h3 className={`${styles.sectionTitleH3Seller} text-center`}>
                Herramientas Publicadas
              </h3>
            </div>
            <div className={styles.sectionsContainer}>
              <section className={styles.scrollInPosts}>
                <div className={`flex flex-wrap gap-4 `}>
                  {user.posts ? (
                    user.posts.map((post) => {
                      return (
                        <Card
                          key={post.id}
                          hidden={post.hidden}
                          photo={post.photo[0]}
                          title={post.title}
                          price={post.price}
                          type={`${
                            post.type === "RENTAL" ? "Arriendo" : "Venta"
                          }`}
                          perDay={post.perDay}
                          id={post.id}
                        />
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-2xl text-center">
                        No tienes herramientas publicadas
                      </p>
                    </div>
                  )}
                </div>
              </section>
              {user.id == userData?.id && (
                <section className={styles.scrollInPosts}>
                  <div className="w-full items-center ">
                    <h3 className="text-center mb-8">
                      Tus compras y arriendos
                    </h3>
                    <CardsOrders
                      setCreatedReviews={setCreatedReviews}
                      userOrders={userOrders}
                    />
                  </div>
                </section>
              )}
            </div>
            <div className={styles.titleReviewContainer}>
              <h3 className={`${styles.sectionTitleH3Seller} text-center`}>
                Reseñas
              </h3>
            </div>
            <div
              className={`flex flex-col justify-center items-center  md:flex-row gap-4 ${styles.itemsStart}`}
            >
              <div
                className={
                  userId === perfilId
                    ? styles.reviewContainer
                    : styles.reviewContainerAutor
                }
              >
                <h3 className="text-center mb-8">Recibidas</h3>
                <div>
                  <CardsReview
                    reviews={reviews}
                    authors={Object.values(authors)}
                  />
                </div>
              </div>
              {userId === perfilId && (
                <div className={styles.reviewContainer}>
                  <h3 className="text-center mb-8">Enviadas</h3>
                  <div>
                    <CardsCreatedReviews
                      perfilId={perfilId}
                      setUser={setUser}
                      createdReviews={createdReviews}
                      setCreatedReviews={setCreatedReviews}
                      author={user}
                      onDeleteReview={handleDeleteReview}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
