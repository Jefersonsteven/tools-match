import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiStarFill, RiStarLine } from "react-icons/ri";

const CardsReview = ({ reviews, authors }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-green-80">
      {reviews.slice(0, 4).map((review) => {
        const author = authors[review.authorId];
        const starCount = 5;
        const rating = review.rating;

        return (
          <div
            className="card rounded-md overflow-hidden shadow-md bg-white "
            key={review.id}
          >
            <div className="user-info flex items-center p-4">
              <div className="user-photo w-12 h-12 rounded-full overflow-hidden mr-4">
                {author && author.photo && (
                  <img
                    src={author.photo}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="user-details">
                <h3 className="text-lg font-semibold">
                  {author ? author.name : ""}
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
          </div>
        );
      })}
    </div>
  );
};

export default CardsReview;
