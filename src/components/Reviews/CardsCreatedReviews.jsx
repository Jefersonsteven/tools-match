import React from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { TiDelete, TiPencil } from "react-icons/ti";
import Image from "next/image";
import styles from "./CardsCreatedReviews.module.css"; // Importamos el archivo CSS local

const CardsCreatedReviews = ({ createdReviews, author }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-green-80">
      {createdReviews.map((review) => {
        const starCount = 5;
        const rating = review.rating;

        return (
          <div
            className="card rounded-md overflow-hidden shadow-md bg-white relative" // Agregamos la clase "relative" para posicionar los botones correctamente
            key={review.id}
          >
            <div className="user-info flex items-center p-4">
              <div className="user-photo w-12 h-12 rounded-full overflow-hidden mr-4">
                {author && author.photo ? (
                  <Image
                    src={author.photo}
                    alt={author.firstname}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src="/assets/userPhotoDefault.png"
                    alt="Default User Photo"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div className="user-details">
                <h3 className="text-lg font-semibold">
                  {author ? author.firstname : ""}
                </h3>
                <div className="rating flex items-center">
                  {Array.from({ length: starCount }, (_, index) => (
                    <div key={index} className="mr-1">
                      {index < rating ? (
                        <RiStarFill className="text-yellow-500" />
                      ) : (
                        <RiStarLine className="text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="review-content px-4 pb-4">{review.content}</p>

            {/* Botones de edición */}
            <div className="absolute top-2 right-2 flex">
              <button
                className={`${styles.iconButton} p-1 bg-transparent border-none`} // Aplicamos la clase personalizada y los estilos al botón
                onClick={() => handleDelete(review.id)}
              >
                <TiDelete className="text-red-500 text-xl" />
              </button>
              <button
                className={`${styles.iconButton} p-1 bg-transparent border-none`} // Aplicamos la clase personalizada y los estilos al botón
                onClick={() => handleEdit(review.id)}
              >
                <TiPencil className="text-blue-500 text-xl" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardsCreatedReviews;