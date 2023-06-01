import React, { useState, useEffect } from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { TiDelete, TiPencil } from "react-icons/ti";
import Image from "next/image";
import styles from "./CardsCreatedReviews.module.css";
import FormUpdateReview from "./FormUpdateReview";
import axios from "axios";

import Swal from "sweetalert2";

const CardsCreatedReviews = ({
  createdReviews,
  author,
  setCreatedReviews,
  onDeleteReview,
}) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "¿Seguro quieres eliminar tu reseña?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Realiza una solicitud DELETE al servidor para eliminar la reseña con el ID proporcionado
          await axios.delete(`/api/admin/review/${id}`);

          // Actualiza el estado de las reseñas creadas eliminando la reseña con el ID correspondiente
          const updatedReviews = createdReviews.filter(
            (review) => review.id !== id
          );
          setCreatedReviews(updatedReviews);

          Swal.fire(
            "Eliminada",
            "La reseña ha sido eliminada correctamente",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar la reseña:", error);
          Swal.fire("Error", "No se pudo eliminar la reseña", "error");
        }
      }
    });
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  const handleFormClose = () => {
    setSelectedReview(null);
  };

  useEffect(() => {
    // Actualizar el renderizado después de editar la reseña
    if (selectedReview) {
      // Realiza la lógica necesaria para actualizar la reseña editada en el arreglo createdReviews
    }
  }, [selectedReview]);

  return (
    <>
      <div className={`grid grid-cols-3 gap-4 bg-green-80 ${styles.flexbox}`}>
        {createdReviews.map((review) => {
          const starCount = 5;
          const rating = review.rating;

          return (
            <div
              className={`card rounded-md overflow-hidden shadow-md bg-white relative ${styles.card}`}
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
              <div>
                <div className="absolute top-2 right-2 flex">
                  <button
                    className={`${styles.iconButton} p-1 bg-transparent border-none`}
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <TiDelete className="text-red-500 text-xl" />
                  </button>
                  <button
                    className={`${styles.iconButton} p-1 bg-transparent border-none`}
                    onClick={() => handleEdit(review)}
                  >
                    <TiPencil className="text-blue-500 text-xl" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedReview && (
        <FormUpdateReview
          setCreatedReviews={setCreatedReviews}
          selectedPost={selectedReview}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CardsCreatedReviews;
