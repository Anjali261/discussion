import React, { useEffect, useContext } from 'react';
import { PostContext } from '../../context/postContext';

const UserPosts = ({ id }) => {
  const { state, dispatch, getPostsByUserId } = useContext(PostContext);

  const { posts = [], loading = false, error = null } = state || {}; 

  useEffect(() => {
    if (id) {
      getPostsByUserId(id);
    }
  }, [id, getPostsByUserId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <img src={post.thumbnail} alt={post.title} />
            <p>{post.description}</p>
            <p>Category: {post.category}</p>
            <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Author ID: {post.creator}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;
