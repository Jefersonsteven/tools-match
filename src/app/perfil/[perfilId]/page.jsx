"use client";

import { useState, useContext, useEffect } from "react";
import Card from "@/components/Cards/Card";

import styles from "./perfil.module.css";
import { AppContext } from "@/context/AppContext";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PerfilUsuario() {
  const [editingUser, setEditingUser] = useState(null);
  const { push } = useRouter();

  const { userId, userData, countries } = useContext(AppContext);

  useEffect(() => {
    !userData && push("/");
  }, [userData]);

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
            </section>
          </div>
        </>
      )}
    </>
  );
}
