import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Auth reducer
const authReducer = (state, action) => {
  console.log("Action received in reducer:", action); 

  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null, 
      };


    case "LOGOUT":
      return { ...state, user: null, token: null, loading: false , error:null};
    case "LOADING":
      return { ...state, loading: true };

    case "SIGNUP_LOADING":
      return { ...state, loading: true, error: null };

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case "SIGNUP_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext();

// Auth provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
