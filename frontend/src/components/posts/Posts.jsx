import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import { PostContext } from "../../context/postContext";

const Posts = () => {
  
  const { posts, loading, error, fetchPosts } = useContext(PostContext);

 
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts, loading, error);

  
  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error}</p>; 
  return <div className="posts">
   {posts.map(post => (
        <Post 
          key={post._id}
          postId={post._id} 
          category={post.category}
          title={post.title}
          description={post.description}
          creator={post.creator} 
          thumbnail={post.thumbnail} 
          createdAt={post.createdAt} 
        />
      ))}
  </div>;
};

export default Posts;
