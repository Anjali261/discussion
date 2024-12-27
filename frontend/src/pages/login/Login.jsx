

// import React from 'react';
// import { Amplify } from 'aws-amplify';
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import "./login.scss";
// import awsExports from "../../aws-exports.js"

// // Configure Amplify with AWS resources
// Amplify.configure(awsExports);

// function Login() {
//   return (
//     <div className="App">
//     <div className="auth-wrapper">
//       {/* Amplify's Authenticator will automatically handle Google login */}
//       <Authenticator 
//        >
//         {({ signOut, user }) => (
//           <div className="auth-container">
//             <header className="App-header">
//               <h1>Hello i'am, {user ? user.username : 'Guest'}!</h1>
//             </header>
//             <main>
//               <p>You are logged in!</p>
//               <button onClick={signOut} className="sign-out-button">
//                 Log Out
//               </button>
//             </main>
//           </div>
//         )}
//       </Authenticator>
//     </div>
//   </div>
//   );
// }

// export default Login;

const handleUserSession = async (user) => {
  try {
    if (!user || !user.signInUserSession || !user.signInUserSession.idToken) {
      console.error('User or token not found');
      return;
    }

    const idToken = user.signInUserSession.idToken;
    const token = idToken.jwtToken;

    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (idToken.payload.exp <= currentTime) {
      console.warn('Token has expired');
      localStorage.removeItem('authToken'); // Clear old token
      dispatch({ type: 'LOGIN_FAILURE', payload: { error: 'Token expired' } });
      return;
    }

    console.log('Valid token:', token);

    // Save token to localStorage
    localStorage.setItem('authToken', token);

    // Validate token with the backend
    const response = await fetch('https://localhost:4000/auth/api/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to validate token');
    }

    const data = await response.json();
    console.log('User saved in database:', data.user);

    // Dispatch user data to context after successful validation
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token } });

    // Redirect to homepage after successful login
    navigate('/');
  } catch (error) {
    console.error('Error handling user session:', error);
    localStorage.removeItem('authToken'); // Clear old token in case of failure
    dispatch({ type: 'LOGIN_FAILURE', payload: { error: error.message } });
  }
};

