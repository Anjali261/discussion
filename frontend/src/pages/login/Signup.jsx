
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { dispatch } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    console.log("Signup triggered");
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
    
    dispatch({ type: 'SIGNUP_LOADING' });

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      
      console.log("Signup Response: ", data);

      if (data.success) {
        alert('Signup successful. Please verify your email.');
        navigate('/verify-otp', { state: { username } });
      } else {
        dispatch({ type: 'SIGNUP_ERROR', payload: data.message });
        setError(data.message);
      }
    } catch (err) {
      dispatch({ type: 'SIGNUP_ERROR', payload: err.message });
      setError('Something went wrong!');
      console.error("Error during signup: ", err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" disabled={false}>Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
