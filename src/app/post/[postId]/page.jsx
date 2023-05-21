"use client";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import styles from "./post.module.css";
import { IoCaretBack } from "react-icons/io5";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "@/components/Loader/Loader";

function PostDetail({}) {
  const { postId } = useParams();
  const { postDetail, setPostDetail, userId, cart, setCart } =
    useContext(AppContext);
  const pd = postDetail;
  const router = useRouter();

  const pd2 = {
    author: {
      rating: 1.0,
      image_perfil:
        "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
    },
  };

  function addCart() {
    if (!cart.items.some((item) => item.id == postDetail.id)) {
      console.log("Entrando en if");
      setCart({
        count: cart.count + 1,
        items: [...cart.items, postDetail],
      });

      if (typeof window !== "undefined")
        localStorage.setItem(
          "cart",
          JSON.stringify({
            count: cart.count + 1,
            items: [...cart.items, postDetail],
          })
        );

      Swal.fire({
        title: "¡Agregado al carrito!",
        text: "El artículo se ha agregado al carrito correctamente.",
        icon: "success",
      });
    }
  }

  async function handleDeletePost() {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el post. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const postDeleted = await axios.delete(
          `/api/admin/post/${postDetail.id}`
        );
        await Swal.fire(
          "¡Eliminado!",
          "El post ha sido eliminado correctamente.",
          "success"
        );
        router.push("/home");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el post.", "error");
      }
    }
  }

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
        {postDetail.author !== undefined ? (
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
                <h5>Categoria:</h5>
                <p>{pd.category}</p>
              </div>
            </section>
            <section className={styles.section_user}>
              <figure className={styles.figure}>
                <p>Mapa unicamente de referencia (Ubicacion aproximada)</p>
                <Image
                  src={pd.author.map}
                  width={600}
                  height={400}
                  alt={pd.author.zipCode + " " + pd.author.country}
                />
              </figure>
              <Link href={`/perfil/${pd.authorId}`}>
                <figure>
                  <Image
                    src={pd.author.photo}
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
              {userId === pd.author.id && (
                <button onClick={handleDeletePost}>Eliminar</button>
              )}
              {userId !== pd.author.id && (
                <button onClick={addCart}>Agregar al carrito</button>
              )}
            </section>
          </>
        ) : (
          <div class="flex flex-col items-center justify-center w-screen h-screen">
            <Loader />
            <h2>Cargando publicación...</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default PostDetail;
