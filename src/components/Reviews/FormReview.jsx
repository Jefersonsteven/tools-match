import React, { useState, useEffect } from "react";
import { RiStarFill } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import styles from "./FormReview.module.css";
import axios from "axios";

const FormReview = ({
  selectedPost,
  onCloseModal,
  onReviewSubmitted,
  setCreatedReviews,
}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];
  const [receivedId, setReceivedId] = useState("");
  const [title, setTitle] = useState("");
  const { perfilId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReceivedId = async () => {
      try {
        const response = await fetch(`/api/admin/post/${selectedPost.id}`);
        const postData = await response.json();
        setReceivedId(postData.authorId);
        setTitle(postData.title);
      } catch (error) {
        console.error("Error al obtener receivedId", error);
      }
    };

    fetchReceivedId();
  }, [selectedPost]);

  const handleRatingClick = (value) => {
    if (rating === value) {
      setRating(value - 1);
    } else {
      setRating(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Evitar envío duplicado si ya se está enviando la reseña
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const reviewData = {
      rating,
      content,
      authorId: perfilId,
      postId: selectedPost.id,
      receivedId,
      title,
    };

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      const reviews = await axios.get(`/api/user/${data.review.author.email}`);
      setCreatedReviews(reviews.data.reviews);
      if (response.ok) {
        console.log("Reseña enviada correctamente");
        onReviewSubmitted();
      } else {
        console.error("Error al enviar la reseña");
      }

      setRating(0);
      setContent("");
      onCloseModal();
    } catch (error) {
      console.error("Error al enviar la reseña", error);
    }

    setIsSubmitting(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    onCloseModal();
  };

  return (
    <div className={`${styles.container} ${isOpen ? "" : styles.hidden}`}>
      <div className={styles.subContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.title}>Opinar y Calificar</h2>
          <AiFillCloseCircle
            color="var(--red)"
            size={25}
            className={styles.buttonClose}
            onClick={handleClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className={styles.label}>
              Fecha:
            </label>
            <div className={styles.fecha}>
              <input
                type="text"
                id="date"
                value={currentDate}
                readOnly
                className={styles.input}
              />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="content" className={styles.label}>
              Reseña:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.inputReview}
              maxLength={500}
            ></textarea>
          </div>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <RiStarFill
                key={value}
                className={`star-icon text-4xl ${
                  value <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleRatingClick(value)}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              className={styles.public}
              style={{ maxWidth: "200px" }}
              disabled={rating === 0 || content === "" || isSubmitting}
            >
              Publicar Reseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormReview;
