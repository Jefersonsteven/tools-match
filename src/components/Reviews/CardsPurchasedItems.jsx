import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import FormReview from "./FormReview";

const CardsPurchasedItems = ({ orderPosts, orderDate, onClose }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handleReviewClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxHeight: "calc(100vh - 200px)",
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
              className="p-4 my-2 bg-white rounded-md shadow-md"
              style={{ marginBottom: "10px" }}
            >
              <div className="flex flex-col">
                <h3 className="text-black font-bold text-3xl">{post.title}</h3>
                <img src={post.photo[0]} alt={post.title} className="w-full" />
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-yellow-500 text-white rounded-md px-4 py-2"
                    onClick={() => handleReviewClick(post)}
                  >
                    Opina sobre tu producto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <FormReview
          selectedPost={selectedPost}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default CardsPurchasedItems;
