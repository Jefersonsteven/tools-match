"use client";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./post.module.css";
import { IoCaretBack } from "react-icons/io5";
import Link from "next/link";

function PostDetail() {
  const { postId } = useParams();
  const { postDetail, setPostDetail, userId } = useContext(AppContext);
  const pd = postDetail;

  function addCart() {
    return true;
  }

  const pd2 = {
    author: {
      rating: 1.0,
    },
  };

  useEffect(() => {
    fetch(`/api/admin/post/${postId}`)
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
                <div>
                <h5>Categoria:</h5>
                <p>{pd.category}</p>
                </div>
                <div>
                <h5>Marca:</h5>
                <p>{pd.brand}</p>
                </div>
              </div>
            </section>
            <section className={styles.section_user}>
              <figure className={styles.figure}>
                <p>Mapa unicamente de referencia (Ubicacion aproximada)</p>
                <Image
                  src={pd?.author?.map}
                  width={600}
                  height={400}
                  alt={pd.author.zipCode + " " + pd.author.country}
                />
              </figure>
              <Link href={`/perfil/${pd.authorId}`}>
                <figure>
                  <Image
                    src={pd.author.photo || "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"}
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
              </Link>
            </section>
            <section className={styles.section_button}>
              {userId === pd.author.id && <button>Eliminar</button>}
              {userId !== pd.author.id && pd.type === "SALE" && (
                <Link href={addCart() && "/cart"}>
                  <button>Comprar</button>
                </Link>
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
