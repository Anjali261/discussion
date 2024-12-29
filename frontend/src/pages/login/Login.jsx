// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.scss';


// function Login({ switchToSignup }) {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');
//   const [token, setToken] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/signin', formData);
//       setToken(response.data.token);
//       setMessage('Signin successful!');
//       setFormData({ username: '', password: '' });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       setMessage('Signin failed: ' + (error.response?.data?.message || 'An error occurred.'));
//     }
//   };

//   return (
//     <div>
//       <h1>Signin</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Signin</button>
//       </form>
//       <p>{message}</p>
//       {token && <p>JWT Token: {token}</p>}
//       <p>
//         Don't have an account? <button onClick={switchToSignup}>Signup</button>
//       </p>
//     </div>
//   );
// }

// function Signup({ switchToLogin }) {
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/signup', formData);
//       setMessage('Signup successful! Please confirm your account.');
//       setFormData({ username: '', email: '', password: '' });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       setMessage('Signup failed: ' + (error.response?.data?.message || 'An error occurred.'));
//     }
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <p>{message}</p>
//       <p>
//         Already have an account? <button onClick={switchToLogin}>Signin</button>
//       </p>
//     </div>
//   );
// }

// function Auth() {
//   const [isLogin, setIsLogin] = useState(true);

//   const switchToSignup = () => setIsLogin(false);
//   const switchToLogin = () => setIsLogin(true);

//   return (
//      <div className="auth-container">
    
//       {isLogin ? (
//         <Login switchToSignup={switchToSignup} />
//       ) : (
//         <Signup switchToLogin={switchToLogin} />
//       )}
//     </div>
//   );
// }

// export default Auth;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/authContext";
// import axios from "axios";

// const Login = () => {
//   const { dispatch } = useAuth();
//   const navigate = useNavigate();
  
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     dispatch({ type: "LOADING" });
//     try {
//       const { data } = await axios.post("http://localhost:4000/signin", { username, password });
//       localStorage.setItem("authToken", data.token); 
//       dispatch({ type: "LOGIN", payload: { user: { username }, token: data.token } });
//       navigate("/");  
//     } catch (err) {
//       dispatch({ type: "ERROR", payload: err.message });
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import "./login.scss";

const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // To store email from server response
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // For popup visibility

  const handleLogin = async () => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await axios.post("http://localhost:4000/signin", {
        username,
        password,
      });
      localStorage.setItem("authToken", data.token);
      setEmail(data.email); // Assuming email is part of the server response
      dispatch({
        type: "LOGIN",
        payload: { user: { username, email: data.email }, token: data.token },
      });
      setShowPopup(true); // Show popup on successful login
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
      setError("Invalid credentials");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/"); // Navigate after closing the popup
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}

        <p className="signup-redirect">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-popup" onClick={closePopup}>
              &times;
            </button>
            <h3>Welcome, {username}!</h3>
            <p>Email: {email}</p>
            <div className="welcome-content">
              <p>🎉 Congratulations on successfully logging in!</p>
              <p>We're thrilled to have you on board.</p>
              <p>Explore our features and discover exciting possibilities.</p>
              <p>If you have questions, feel free to reach out to support.</p>
              <p>Let’s make your experience amazing! 🚀</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
