import React, { useState, useEffect } from "react";
import { RiStarFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "next/navigation";
import axios from "axios";

const FormUpdateReview = ({ selectedPost, onClose, setCreatedReviews }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];
  const { perfilId } = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/admin/review/${selectedPost.id}`);
        const reviewData = await response.json();
        setRating(reviewData.rating);
        setContent(reviewData.content);
      } catch (error) {
        console.error("Error al obtener la reseña", error);
      }
    };

    fetchReview();
  }, [selectedPost]);

  const handleRatingClick = (value) => {
    if (rating === value) {
      setRating(value - 1);
    } else {
      setRating(value);
    }
  };

  const fetchCreatedReviews = async () => {
    try {
      const response = await axios.get(`/api/admin/user/${perfilId}`);

      const createdReviews = response.data.reviews.filter(
        (review) => review.hidden === false
      );
      setCreatedReviews(createdReviews);
    } catch (error) {
      console.error("Error fetching createdReviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      content,
      authorId: perfilId,
      postId: selectedPost.id,
      perfilId,
    };

    try {
      const response = await fetch(`/api/review/${selectedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      const reviews = await fetchCreatedReviews();
      if (response.ok) {
        console.log("Reseña actualizada correctamente");
        onClose();
      } else {
        console.error("Error al actualizar la reseña");
        console.log(reviewData);
      }

      setRating(0);
      setContent("");
    } catch (error) {
      console.error("Error al actualizar la reseña", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/4 relative">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="bg-yellow-500 rounded-full p-2"
            onClick={handleClose}
          >
            <AiOutlineClose className="text-black" />
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Editar Reseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium">
              Fecha:
            </label>
            <div className="w-full border bg-white border-gray-300 rounded p-2 text-sm">
              <input
                type="text"
                id="date"
                value={currentDate}
                readOnly
                className="w-full bg-white cursor-text"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-1 text-sm font-medium">
              Reseña:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm h-40"
              maxLength={500}
            ></textarea>
          </div>
          <div className="mb-4 flex justify-center">
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full text-sm"
              style={{ maxWidth: "200px" }}
            >
              Actualizar Reseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateReview;
