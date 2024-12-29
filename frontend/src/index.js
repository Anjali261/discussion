import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PostContextProvider } from "./context/postContext";
import { AuthProvider,  } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <DarkModeContextProvider>
     
        <PostContextProvider>
        <App />
        </PostContextProvider>
    </DarkModeContextProvider>
    </AuthProvider>
   

  </React.StrictMode>
);

