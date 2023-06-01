import React, { useEffect, useState } from "react";
import FormReview from "./FormReview";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./CardsPurchasedItems.module.css";
import { useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import LoaderRadial from "../Loader/LoaderRadial";

const CardsPurchasedItems = ({
  orderPosts,
  orderDate,
  onClose,
  setCreatedReviews,
}) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const { perfilId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await Promise.all(
        orderPosts.map(async (postId) => {
          const response = await fetch(`/api/post/${postId}`);
          const data = await response.json();
          return data;
        })
      );
      setPosts(fetchedPosts);
      setIsLoading(false);
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
        (review) =>
          review.authorId === perfilId &&
          review.postId === postId &&
          !review.hidden
      );
      return !!userReview;
    }
    return false;
  };

  return (
    <div className={posts?.length > 1 ? styles.containerTwo : styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {multipleItems
            ? "¿Qué te parecieron tus productos?"
            : "¿Qué te pareció tu producto?"}
        </div>
        <AiFillCloseCircle
          size={25}
          color="var(--red)"
          onClick={onClose}
          className={styles.buttonClose}
        />
      </div>
      <div className={styles.containerProduct}>
        {isLoading || posts.length === 0 ? (
          <div className={styles.loaderContainer}>
            <LoaderRadial />
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post?.id}
              className={styles.product}
              style={{ minHeight: "270px" }}
            >
              <h3>{post.title}</h3>
              <Image
                width={200}
                height={200}
                src={post.photo[0]}
                alt={post.title}
                className={styles.img}
                style={{ paddingBottom: "40px" }}
              />
              <div className={styles.reviewContainer}>
                {hasUserReviewed(post?.id) ? (
                  <>
                    <FaCheckCircle
                      size={20}
                      color="green"
                      className={styles.checkIcon}
                    />
                    <label className={styles.reviewLabel}>
                      Ya publicamos tu reseña
                    </label>
                  </>
                ) : !reviewSubmitted ? (
                  <button
                    className={`${styles.opinion} ${
                      isReviewModalOpen && styles.disabled
                    }`}
                    onClick={() => handleReviewModalOpen(post)}
                  >
                    {isReviewModalOpen
                      ? "Dejar Reseña"
                      : "Opina sobre tu producto"}
                  </button>
                ) : (
                  <>
                    <FaCheckCircle
                      size={20}
                      color="green"
                      className={styles.checkIcon}
                    />
                    <label className={styles.reviewLabel}>
                      Ya publicamos tu reseña
                    </label>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {isReviewModalOpen && (
        <FormReview
          setCreatedReviews={setCreatedReviews}
          selectedPost={selectedPost}
          onCloseModal={() => setIsReviewModalOpen(false)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </div>
  );
};

export default CardsPurchasedItems;
