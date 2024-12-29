
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the username from the location state
  const { username } = location.state || {};
  
  // State variables to handle OTP and error messages
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // To handle button state during submission

  // Function to handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Disable button during submission

    console.log("OTP Verification triggered");
    console.log("Username: ", username);
    console.log("Entered OTP: ", otp);
    
    try {
      // Send OTP verification request to the backend
      const response = await fetch('http://localhost:4000/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, confirmationCode: otp }),
      });

      const data = await response.json();
      console.log("OTP Verification Response: ", data);
      
      // Check if OTP verification was successful
      if (data.success) {
        alert('OTP Verified successfully!');
        navigate('/login');  // Redirect to the login page
      } else {
        setError(data.message);  // Display error message if verification fails
      }
    } catch (err) {
      setError('Something went wrong!');
      console.error("Error during OTP verification: ", err.message);
    } finally {
      setIsSubmitting(false);  // Re-enable the button after submission is complete
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
    </div>
  );
};

export default VerifyOtp;
