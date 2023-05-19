"use client";

import { useState, useContext, useEffect } from "react";
import Card from "@/components/Cards/Card";

import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CardsReview from "@/components/CardsReview";
import CardsOrders from "@/components/CardsOrders";

export default function PerfilUsuario() {
  const [editingUser, setEditingUser] = useState(null);
  const { push } = useRouter();

  const { userId, userData, countries } = useContext(AppContext);

  const mockReviews = [
    {
      id: 1,
      authorId: 1,
      rating: 4,
      content:
        "Recomiendo a Celes, se nota que es una persona honesta y es muy amable. Le bajo un punto porque no admite pago por mercado pago, solo efectivo",
    },
    {
      id: 2,
      authorId: 2,
      rating: 5,
      content:
        "Arrende la cortadora de cesped y no andaba muy bien, me devolvio mi dinero",
    },
    {
      id: 3,
      authorId: 3,
      rating: 1,
      content:
        "Arrende la amoladora, nunca me la trajo, todavia estoy esperando",
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
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwreugxnlmImJ5PTfcUCyRaeebl3dFILAlQ&usqp=CAU",
    },
    2: {
      id: 2,
      name: "María",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_uNbufEmwkBM0nI0Rikxewub7z9gIGWHDDtiOweMRx58IUe_qZnDSwrqVHJwElifZU&usqp=CAU",
    },
    3: {
      id: 3,
      name: "Pedro",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQywX3xEBz6HuunsE0XJeTMXdEeL4EChAo4A&usqp=CAU",
    },
    4: {
      id: 4,
      name: "Laura",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmp9uWxwev84Uff5D80j1aCBuZUDVMeKRKFN0A4X12mH_BZmW7ULcpqThqTSitTS46kz8&usqp=CAU",
    },
  };

  useEffect(() => {
    !userData && push("/");
  }, [userData, push]);

  const [authors, setAuthors] = useState({});

  useEffect(() => {
    const authorIds = [
      ...new Set(userData?.received.map((review) => review.authorId)),
    ];

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
  }, [userData?.received]);

  return (
    <>
      {userData && (
        <>
          <h2 className={styles.sectionTitle}>Perfil de toolmatch</h2>
          <section className={styles.section}>
            <div className={styles.userContainer}>
              <div className={styles.userDataContainer}>
                <div className={styles.imageContainer}>
                  <Image
                    src={
                      userData.photo
                        ? userData.photo
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
                    {`@${userData.firstname}`}
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
                <Link
                  href={`perfil/${userId}/edit`}
                  className={styles.editButton}
                >
                  Editar datos
                </Link>
              </div>
            </div>
          </section>
          <div className={styles.sectionsContainer}>
            <section>
              <h3 className={styles.sectionTitleH3}>Herramientas Publicadas</h3>
              <div className="grid grid-cols-4 gap-9">
                {userData.posts.length ? (
                  userData.posts.map((post) => {
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
                  <p>No hay productos publicados</p>
                )}
              </div>
            </section>
            <section>
              <h3 className={styles.sectionTitleH3}>Compras y Arriendos</h3>
              <div className="w-full items-center ">
                <CardsOrders />
              </div>
            </section>
          </div>
          <div className="flex gap-4">
            <div className={styles.reviewContainer}>
              <h3 className={styles.sectionTitleH3}>Reseñas</h3>
              <CardsReview reviews={mockReviews} authors={mockAuthors} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
