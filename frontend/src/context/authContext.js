// src/context/authContext.js

import React, { createContext, useReducer } from 'react';

// Define initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Define actions
const actionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_USER_DATA: 'SET_USER_DATA',
};

// Define reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return { ...state, loading: true, error: null };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false };
    case actionTypes.LOGIN_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
    case actionTypes.LOGOUT:
      return { ...initialState }; // Reset state
    case actionTypes.SET_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext();

// Create provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
