import React, { useEffect, useState } from "react";
import FormReview from "./FormReview";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./CardsPurchasedItems.module.css";
import Image from "next/image";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {multipleItems
            ? "¿Qué te parecieron tus productos?"
            : "¿Qué te pareció tu producto?"}
        </div>
        <AiFillCloseCircle size={25} color="var(--red)" onClick={onClose} />
      </div>
      <div className={styles.containerProduct}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={styles.product}
            style={{ minHeight: "270px" }} // Ajusta la altura mínima según tus necesidades
          >
            <h3>{post.title}</h3>
            <Image
              width={100}
              height={100}
              src={post.photo[0]}
              alt={post.title}
              className={styles.img}
              style={{ paddingBottom: "40px" }} // Ajusta el padding inferior según tus necesidades
            />
            <button
              className={styles.opinion}
              onClick={() => handleReviewModalOpen(post)}
            >
              {reviewSubmitted ? "Edita tu reseña" : "Opina sobre tu producto"}
            </button>
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
