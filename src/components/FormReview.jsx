import React, { useState } from "react";
import { RiStarFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

const FormReview = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];

  const handleRatingClick = (value) => {
    if (rating === value) {
      // Si se hace clic en la misma estrella, se colorea una menos
      setRating(value - 1);
    } else {
      setRating(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      content,
      date: currentDate,
    };

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // La reseña se envió correctamente
        console.log("Reseña enviada correctamente");
      } else {
        // Hubo un error al enviar la reseña
        console.error("Error al enviar la reseña");
      }

      // Reiniciamos los campos después de enviar
      setRating(0);
      setContent("");
    } catch (error) {
      console.error("Error al enviar la reseña", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-2/3 max-w-lg bg-green-100 p-8 rounded-lg shadow">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="bg-yellow-500 rounded-full p-2"
            onClick={handleClose}
          >
            <AiOutlineClose className="text-black" />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Opinar y Calificar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block bg-mb-1 text-sm font-medium">
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
          <div className="flex justify-center



">
            <button
              type="submit"              
              className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-3 rounded-full text-xs"
              style={{ maxWidth: "200px" }}
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