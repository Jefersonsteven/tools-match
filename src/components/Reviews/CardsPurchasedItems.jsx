import React, { useEffect, useState } from "react";
import FormReview from "./FormReview";

const CardsPurchasedItems = ({ orderPosts, orderDate, onClose }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await Promise.all(
        orderPosts.map(async (postId) => {
          const response = await fetch(`/api/post/${postId}`);
          const data = await response.json();
          return data;
        })
      );
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [orderPosts]);

  const multipleItems = orderPosts.length > 1;

  const handleReviewModalOpen = (post) => {
    setSelectedPost(post);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmitted = () => {
    setReviewSubmitted(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
      }}
    >
      <div className="w-full max-w-xl mb-4">
        <div className="text-gray-600 text-lg">{orderDate}</div>
        <div className="text-black font-bold text-3xl mb-4 mt-2">
          {multipleItems ? "¿Qué te parecieron tus productos?" : "¿Qué te pareció tu producto?"}
        </div>
      </div>
      <div className="w-full max-w-xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-2 bg-white rounded-md shadow-md mb-12"
            style={{ minHeight: "270px" }} // Ajusta la altura mínima según tus necesidades
          >
            <div className="flex flex-col">
              <h3 className="text-black font-bold text-2xl">{post.title}</h3>
              <img
                src={post.photo[0]}
                alt={post.title}
                className="w-full p-8"
                style={{ paddingBottom: "40px" }} // Ajusta el padding inferior según tus necesidades
              />
            </div>
            <div className="flex justify-end mt-auto">
              <button
                className="bg-yellow-500 text-white rounded-md px-4 py-2"
                onClick={() => handleReviewModalOpen(post)}
              >
                {reviewSubmitted ? "Edita tu reseña" : "Opina sobre tu producto"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {isReviewModalOpen && (
        <FormReview
          selectedPost={selectedPost}
          onCloseModal={() => setIsReviewModalOpen(false)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

export default CardsPurchasedItems;
