"use client";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./post.module.css";
import { IoCaretBack } from "react-icons/io5";
import Link from "next/link";

function PostDetail({}) {
  const { postId } = useParams();
  const { postDetail, setPostDetail, userId } = useContext(AppContext);
  const pd = postDetail;

  const pd2 = {
    author: {
      rating: 1.0,
      image_perfil:
        "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
    },
    images: [
      "https://us.123rf.com/450wm/godruma/godruma1802/godruma180200012/95380266-taladro-manual-o-m%C3%A1quina-de-perforaci%C3%B3n-equipada-con-un-accesorio-de-herramienta-de-corte-o-de.jpg",
      "https://us.123rf.com/450wm/vivacityimages/vivacityimages2004/vivacityimages200400051/144863343-vista-lateral-del-taladro-manual-a-bater%C3%ADa.jpg",
    ],
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/admin/post/${postId}`)
      .then((response) => response.json())
      .then((data) => setPostDetail(data));
  }, [setPostDetail, postId]);

  return (
    <div className={styles.main_container}>
      <Link
        onClick={() => setPostDetail([])}
        className={styles.back}
        href="/home"
      >
        <IoCaretBack size={50} color="var(--white)" />
      </Link>
      <main className={styles.main}>
        {postDetail.author !== undefined && (
          <>
            <section className={styles.section_images}>
              <figure className={styles.figure}>
                <Image
                  className={styles.image_first}
                  src={pd?.photo[0]}
                  width={442}
                  height={400}
                  alt={pd.title}
                  priority
                />
              </figure>
              <div>
                <figure className={styles.images}>
                  {pd?.photo.map((img, index) => (
                    <Image
                      className={styles.image_others}
                      key={index}
                      src={img}
                      width={92}
                      height={81}
                      alt={pd.title}
                    />
                  ))}
                </figure>
              </div>
              <figure className={styles.figure}>
                <p>Mapa unicamente de referencia (Ubicacion aproximada)</p>
                <Image
                  src={pd.author.map}
                  width={600}
                  height={400}
                  alt={pd.author.zipCode + " " + pd.author.country}
                />
              </figure>
            </section>
            <section className={styles.section_description}>
              <div className={styles.description_title}>
                <h2>{pd.title}</h2>
                <div>
                  {pd.type === "SALE" && <h3>${pd.price}</h3>}
                  {pd.type === "LEASE" && <h3>${pd.pricePerDay}</h3>}
                </div>
              </div>
              <p>{pd.content}</p>
              <div className={styles.description_categories}>
                <h5>Categoria:</h5>
                <p>{pd.category}</p>
              </div>
            </section>
            <section className={styles.section_user}>
              <div>
                <figure>
                  <Image
                    src={pd?.photo[0]}
                    width={96}
                    height={96}
                    alt={pd.author.firstname}
                  />
                </figure>
                <div className={styles.user_info}>
                  <h5>
                    <b>{pd.type === "SALE" ? "Vendedor: " : "Arrendador"}</b>@
                    {pd.author.firstname}
                  </h5>
                  <h5>⭐{pd2.author.rating}.0</h5>
                </div>
              </div>
            </section>
            <section className={styles.section_button}>
              {userId === pd.author.id && <button>Eliminar</button>}
              {userId !== pd.author.id && pd.type === "SALE" && (
                <button>Comprar</button>
              )}
              {userId !== pd.author.id && pd.type === "RENTAL" && (
                <button>Arrendar</button>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default PostDetail;
