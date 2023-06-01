"use client";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "./post.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";
import Back from "@/components/back/Back";
import Review from "./Review";
import LoaderRadial from "@/components/Loader/LoaderRadial";
import { BsCartPlusFill } from "react-icons/bs";
import { calcularPromedioDeRatings } from "@/components/Cards/assets/calculateAverage";

function PostDetail({}) {
  const { postId } = useParams();
  const [rentalDays, setRentalDays] = useState("1");
  const { postDetail, setPostDetail, userId, cart, setCart } =
    useContext(AppContext);
  const pd = postDetail;
  const router = useRouter();

  const pd2 = {
    author: {
      rating: 1.0,
    },
  };

  function handleDaysRental(event) {
    const value = event.target.value;
    setRentalDays(value);
  }

  function addCart() {
    if (
      !cart.items.some((item) => item.id === postDetail.id) &&
      pd.status !== "Arrendado" &&
      !pd.hidden
    ) {
      setCart({
        count: cart.count + 1,
        items:
          pd.type === "SALE"
            ? [...cart.items, postDetail]
            : [
                ...cart.items,
                { ...postDetail, price: postDetail.price * rentalDays },
              ],
      });

      if (typeof window !== "undefined")
        localStorage.setItem(
          "cart",
          JSON.stringify({
            count: cart.count + 1,
            items:
              pd.type === "SALE"
                ? [...cart.items, postDetail]
                : [
                    ...cart.items,
                    { ...postDetail, price: postDetail.price * rentalDays },
                  ],
          })
        );

      Swal.fire({
        title: "¡Agregado al carrito!",
        text: "El artículo se ha agregado al carrito correctamente.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Seguir comprando",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/cart");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.push("/home");
        }
      });
    } else {
      if (pd.hidden) {
        Swal.fire({
          title: "Sin Stock!",
          text: "¡No hay mas unidades, de este producto!",
          icon: "warning",
          showCancelButton: false,
          timer: 2000,
          didOpen: () => {
            setTimeout(() => {
              Swal.close();
            }, 2000);
          },
        });
      } else {
        Swal.fire({
          title:
            pd.status !== "Arrendado"
              ? "¡Producto ya agregado!"
              : "Esta en arriendo",
          text:
            pd.status !== "Arrendado"
              ? "Este artículo ya se encuentra en tu carrito."
              : "Esta producto ya esta arrendado, espera a que este disponible",
          icon: "warning",
          showCancelButton: false,
          timer: 2000,
          didOpen: () => {
            setTimeout(() => {
              Swal.close();
            }, 2000);
          },
        });
      }
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
    setPostDetail({});

    fetch(`/api/admin/post/${postId}`)
      .then((response) => response.json())
      .then((data) => setPostDetail(data));
  }, [setPostDetail, postId]);

  return (
    <div>
      <Back />
      <div className={styles.main_container}>
        {/* <Link
          onClick={() => setPostDetail([])}
          className={styles.back}
          href="/home"
        >
          <IoCaretBack size={50} color="var(--white)" />
        </Link> */}
        <main className={styles.main}>
          {postDetail.author === undefined && (
            <div className="grid justify-center items-center fixed w-screen h-3/6">
              <LoaderRadial />
            </div>
          )}
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
                    <h3>${pd.price}</h3>
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
                  <div>
                    <h5>Ciudad:</h5>
                    <p>{pd.author.city}</p>
                  </div>
                  {pd.type === "RENTAL" && (
                    <div>
                      <h5>Status:</h5>
                      <p>{pd.status}</p>
                    </div>
                  )}
                </div>
                <figure className={styles.map}>
                  <p>Mapa unicamente de referencia (Ubicacion aproximada)</p>
                  <Image
                    src={pd.author.map}
                    width={600}
                    height={400}
                    alt={pd.author.zipCode + " " + pd.author.country}
                  />
                </figure>
              </section>
              <section className={styles.section_user}>
                <Link href={`/perfil/${pd.authorId}`}>
                  <figure>
                    <Image
                      src={
                        pd.author.photo ||
                        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                      }
                      width={96}
                      height={96}
                      alt={pd.author.firstname}
                    />
                  </figure>
                  <div className={styles.user_info}>
                    <h5>
                      <b>
                        {pd.type === "SALE" ? "Vendedor: " : "Arrendador: "}
                      </b>
                      @{pd.author.firstname}
                    </h5>
                    <h5>⭐{calcularPromedioDeRatings(pd.reviews)}{calcularPromedioDeRatings(pd.reviews) === 0 && ".0"}</h5>
                  </div>
                </Link>
                <div className={styles.reviews}>
                  <h3>Reseñas: </h3>
                  {pd.reviews.length === 0 && <h4>No hay reseñas.</h4>}
                  <div>
                    {pd.reviews?.map((review) => {
                      if (!review.hidden) {
                        return <Review key={review.id} review={review} />;
                      }
                    })}
                  </div>
                </div>
              </section>
              <section className={styles.section_button}>
                {userId === pd.author.id && (
                  <button onClick={handleDeletePost}>Eliminar</button>
                )}
                {userId !== pd.author.id && (
                  <button
                    onClick={addCart}
                    disabled={pd.status === "arriendo" ? true : false}
                  >
                    Agregar al carrito <BsCartPlusFill />
                  </button>
                )}
                {pd.type === "RENTAL" && (
                  <select
                    name="daysRental"
                    id=""
                    className={styles.input}
                    onChange={handleDaysRental}
                  >
                    <option value="1">Dias de Arriendo</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default PostDetail;
