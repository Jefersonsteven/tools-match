import React, { useEffect, useState } from "react";

const CardsPurchasedItems = ({ orderPosts }) => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        {posts.map((post) => (
          <div key={post.id} className="p-4 my-2 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h3 className="text-black font-bold text-3xl">{post.title}</h3>
                <img src={post.photo[0]} alt={post.title} className="w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPurchasedItems;