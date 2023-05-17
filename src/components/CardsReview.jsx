import React from "react";
import { RiStarFill } from "react-icons/ri";

const CardsReview = ({ reviews, userId }) => {
  return (
    <div className="cards-container">
      {reviews.slice(0, 4).map((review) => (
        <div className="card" key={review.id}>
          <div className="user-info">
            <div className="user-photo">
              <img src={review.user.photo} alt={review.user.name} />
            </div>
            <div className="user-details">
              <h3>{review.user.name}</h3>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <RiStarFill
                    key={value}
                    className={`star-icon ${
                      value <= review.rating ? "selected" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="review-content">{review.content}</p>
          {review.user.id === userId && (
            <button className="edit-button">Edit</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsReview;