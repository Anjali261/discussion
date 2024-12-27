import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const PostContext = createContext();

const initialState = {
  posts: [],
  post: null,
  comments: [], 
  loading: false,
  error: null,
  message: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
        message: "Post created successfully!",
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
        error: null,
        message: "Post updated successfully!",
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
        error: null,
        message: "Post deleted successfully!",
      };
    case "LIKE_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
        error: null,
      };
    case "COMMENT_POST_SUCCESS":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        loading: false,
        error: null,
      };
    case "FOLLOW_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        message: "User followed successfully!",
      };
    case "POST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case "FETCH_POST_FAIL":{
        return{
          ...state,
          posts:[],
          loading:false,
          error:action.payload,
        }
      }
      case "USER_POST_BY_ID":{
        return{
          ...state,
          posts:action.payload,
          laoding:false,
          error:null,

        }
      }

      case "FAIL_USER_POST_BY_ID":{
        return{
          ...state,
          posts:[],
          laoding:false,
          error:action.payload,

        }
      }
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/posts");
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: res.data });
      console.log(res.data);
    } catch (error) {
      dispatch({ type: 'POST_FAIL', payload: error.message });
    }
  };


  const createPost = async (postData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
  
      const res = await axios.post(
        "http://localhost:4000/api/posts",  
        postData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
  
      dispatch({ type: "CREATE_POST_SUCCESS", payload: res.data });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message || "Failed to create post";
      console.log("API Error: ", errorMessage);
      dispatch({
        type: "POST_FAIL", 
        payload: errorMessage,
      });
    }
  };
  

  // Update a post
  const updatePost = async (id, postData) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.put(`http://localhost:4000/posts/${id}`, postData);
      dispatch({ type: "UPDATE_POST_SUCCESS", payload: res.data });
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to update post";
      dispatch({ type: "POST_FAIL", payload: errorMessage });
      console.error("API Error:", errorMessage);
    }
  };

  const deletePost = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      await axios.delete(`http://localhost:4000/posts/${id}`);
      dispatch({ type: "DELETE_POST_SUCCESS", payload: id });
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to delete post";
      dispatch({ type: "POST_FAIL", payload: errorMessage });
      console.error("API Error:", errorMessage);
    }
  };

  const likePost = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.put(`http://localhost:4000/posts/${id}/like`);
      dispatch({ type: "LIKE_POST_SUCCESS", payload: res.data });
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to like post";
      dispatch({ type: "POST_FAIL", payload: errorMessage });
      console.error("API Error:", errorMessage);
    }
  };

  const commentPost = async (id, commentData) => {
    dispatch({ type: "LOADING" });
    try {
        const res = await axios.post(`http://localhost:4000/api/posts/${id}/comment`, commentData);
        dispatch({ type: "COMMENT_POST_SUCCESS", payload: res.data });
    } catch (error) {
        const errorMessage = error.response?.data.message || "Failed to comment on post";
        dispatch({ type: "POST_FAIL", payload: errorMessage });
        console.error("API Error:", errorMessage);
    }
};

  const followUser = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.post(`http://localhost:4000/users/${id}/follow`);
      dispatch({ type: "FOLLOW_USER_SUCCESS", payload: res.data });
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to follow user";
      dispatch({ type: "POST_FAIL", payload: errorMessage });
      console.error("API Error:", errorMessage);
    }
  };

  const getPostsByUserId = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.get(`http://localhost:4000/api/posts/user/${id}`);
      dispatch({ type: 'FETCH_USER_POSTS_SUCCESS', payload: res.data });
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to fetch user's posts";
      dispatch({ type: 'FAIL_USER_POSTS', payload: errorMessage });
      console.error("API Error:", errorMessage);
    }
  };
  

  return (
    <PostContext.Provider
      value={{
        ...state,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        likePost,
        commentPost,
        followUser,
        getPostsByUserId
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
