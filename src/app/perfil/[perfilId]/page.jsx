"use client";

import { useState, useContext, useEffect } from "react";
import Card from "@/components/Cards/Card";

import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import CardsReview from "@/components/CardsReview";
import CardsOrders from "@/components/CardsOrders";
import axios from 'axios'

import Back from "@/components/back/Back";

export default function PerfilUsuario() {
  const [editingUser, setEditingUser] = useState(null);
  const { push } = useRouter();
  const { perfilId } = useParams()

  const { userId, userData, countries } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({})
  const [authors, setAuthors] = useState({});
  const [userOrders, setUserOrders] = useState([]);


  useEffect(() => {
    console.log(perfilId)
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/api/admin/user/${perfilId}`
        );

        const receivedReviews = response.data.received;
        setUser(response.data)
        setReviews(receivedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [userId]);

 useEffect(() => {
  const fetchAuthors = async () => {
    try {
      const authorIds = [
        ...new Set(reviews.map((review) => review.authorId)),
      ];

      const fetchedAuthors = await Promise.all(
        authorIds.map((authorId) =>
          axios.get(`/api/admin/user/${authorId}`)
        )
      );

      setAuthors(fetchedAuthors.map(response => response.data)); // Convertir la respuesta en un array de datos
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
        const postId = order.postId;
        const postResponse = await axios.get(`/api/post/${postId}`);
        const postDetails = postResponse.data;
        return {
          ...order,
          title: postDetails.title,
          type: postDetails.type,
          price: postDetails.price,
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
    !userData && push("/");
  }, [userData, push]);


  return (
    <>
      {user && (
        <>
          <Back />
          <h2 className={styles.sectionTitle}>Perfil de toolmatch</h2>
          <section className={styles.section}>
            <div className={styles.userContainer}>
              <div className={styles.userDataContainer}>
                <div className={styles.imageContainer}>
                  <Image
                    src={
                      user.photo
                        ? user.photo
                        : "/assets/userPhotoDefault.png"
                    }
                    width={254}
                    height={254}
                    alt="Uploaded"
                  />
                </div>
                <div>
                  <h2>
                    <strong>Usuario: </strong>
                    {`@${user.firstname}`}
                  </h2>
                  <h2>
                    <strong>Nombre completo: </strong>
                    {`${user.firstname} ${user.lastname}`}
                  </h2>
                  <h2>
                    <strong>Correo: </strong>
                    {user.email}
                  </h2>
                  <h2>
                    <strong>País de residencia: </strong>
                    {user.country ? countries[user.country] : "---"}
                  </h2>
                  <h2>
                    <strong>Código postal: </strong>
                    {user.zipCode ? user.zipCode : "---"}
                  </h2>
                  <h2>
                    <strong>Celular: </strong>
                    {user.phoneNumber ? user.phoneNumber : "---"}
                  </h2>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {user.id == userData.id ? (
                  <Link
                  href={`perfil/${userId}/edit`}
                  className={styles.editButton}
                >
                  Editar datos
                </Link>
                )
                :
                <button>
                  Reportar
                </button>
                }
              </div>
            </div>
          </section>
          <div className={styles.sectionsContainer}>
            <section>
              <h3 className={styles.sectionTitleH3}>Herramientas Publicadas</h3>
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
            { user.id == userData.id &&
                <section>
                  <h3 className={styles.sectionTitleH3}>Compras y Arriendos</h3>
                  <div className="w-full items-center ">
                  <CardsOrders userOrders={userOrders} />
                  </div>
                </section>
            }
          </div>
          <div className="flex gap-4">
            <div className={styles.reviewContainer}>              
              <h3 className={styles.sectionTitleH3}>
                Reseñas de tus herramientas
              </h3>
              <CardsReview reviews={reviews} authors={Object.values(authors)} />             
            </div>
          </div>
        </>
      )}
    </>
  );
}
