import React, { useEffect, useState } from "react";
import FormReview from "./FormReview";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from './CardsPurchasedItems.module.css'
import { useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const CardsPurchasedItems = ({ orderPosts, orderDate, onClose }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const { perfilId } = useParams();

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

  const hasUserReviewed = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      const userReview = post.reviews.find(
        (review) => review.authorId === perfilId && review.postId === postId && !review.hidden
      );
      return !!userReview;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {multipleItems ? "¿Qué te parecieron tus productos?" : "¿Qué te pareció tu producto?"}
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
            <img
              src={post.photo[0]}
              alt={post.title}
              className={styles.img}
              style={{ paddingBottom: "40px" }} // Ajusta el padding inferior según tus necesidades
            />
            <div className={styles.reviewContainer}>
              {hasUserReviewed(post.id) ? (
                <>
                  <FaCheckCircle size={20} color="green" className={styles.checkIcon} />
                  <label className={styles.reviewLabel}>Ya publicamos tu reseña</label>
                </>
              ) : (
                !reviewSubmitted ? (
                  <button
                    className={`${styles.opinion} ${isReviewModalOpen && styles.disabled}`}
                    onClick={() => handleReviewModalOpen(post)}
                  >
                    {isReviewModalOpen ? "Dejar Reseña" : "Opina sobre tu producto"}
                  </button>
                ) : (
                  <>
                  <FaCheckCircle size={20} color="green" className={styles.checkIcon} />
                  <label className={styles.reviewLabel}>Ya publicamos tu reseña</label>
                  </>
                )
              )}
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
