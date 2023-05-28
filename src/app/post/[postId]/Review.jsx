import Image from "next/image";
import { RiStarFill, RiStarLine } from "react-icons/ri";

function Review({ review }) {
  const starCount = 5;
  return (
    <div className="card rounded-md overflow-hidden shadow-md bg-white">
      <div className="user-info flex items-center p-4">
        <div className="user-photo w-12 h-12 rounded-full overflow-hidden mr-4">
          {review.author && review.author.photo ? (
            <Image
              src={review.author.photo}
              alt={review.author.firstname}
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
            {review.author ? review.author.firstname : ""}
          </h3>
          <div className="rating flex items-center">
            {Array.from({ length: starCount }, (_, index) => (
              <div key={index} className="mr-1">
                {index < review.rating ? (
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
}

export default Review;
