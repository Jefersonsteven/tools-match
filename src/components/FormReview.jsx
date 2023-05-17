import React, { useState } from "react";
import { RiStarFill } from "react-icons/ri";

const FormReview = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer algo con los datos enviados, como enviarlos a un servidor

    // Reiniciamos los campos después de enviar
    setRating(0);
    setContent("");
    setDate("");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Rating:</label>
            {[1, 2, 3, 4, 5].map((value) => (
              <RiStarFill
                key={value}
                className={`star-icon ${value <= rating ? "selected" : ""}`}
                onClick={() => handleRatingClick(value)}
              />
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormReview;