"use client";

import { useState, useContext, useEffect } from "react";
import Card from "@/components/Cards/Card";
import styles from "../../../perfil/[perfilId]/perfil.module.css"

import { AppContext } from "@/context/AppContext";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import CardsReview from "@/components/Reviews/CardsReview";
import CardsOrders from "@/components/Reviews/CardsOrders";
import axios from "axios";

import Back from "@/components/back/Back";

export default function UsuarioDash() {
  const [editingUser, setEditingUser] = useState(null);
  const { push } = useRouter();
  const { id } = useParams();

  const { userId, userData, countries } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [authors, setAuthors] = useState({});
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${id}`);

        const receivedReviews = response.data.received;
        setUser(response.data);
        setReviews(receivedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [userId, id]);

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

  return (
    <>
      <section>
        <Back />
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
            </section>
            <div className={styles.sectionsContainer}>
              <section>
                <h3 className={styles.sectionTitleH3}>
                  Herramientas Publicadas
                </h3>
                <div className="grid grid-cols-4 gap-9">
                  {user.posts ? (
                    user.posts.map((post) => {
                      return (
                        <Card
                          key={post.id}
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
                    <div class="flex items-center justify-center ">
                      <p className="text-2xl text-center">
                        No tienes herramientas publicadas
                      </p>
                    </div>
                  )}
                </div>
              </section>
              {user.id == userData?.id && (
                <section>
                  <h3 className={styles.sectionTitleH3}>Compras y Arriendos</h3>
                  <div className="w-full items-center ">
                    <CardsOrders userOrders={userOrders} />
                  </div>
                </section>
              )}
            </div>
            <div className="flex gap-4">
              <div className={styles.reviewContainer}>
                <h3 className={styles.sectionTitleH3}>
                  Reseñas de tus herramientas
                </h3>
                <CardsReview
                  reviews={reviews}
                  authors={Object.values(authors)}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}