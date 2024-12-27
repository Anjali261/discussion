// const AWS = require('aws-sdk');
// const jwt = require('jsonwebtoken');

// const cognito = new AWS.CognitoIdentityServiceProvider({
//     region: process.env.AWS_REGION,
// });

// // Login handler
// const loginUser = async (req, res) => {
//     const { username, password } = req.body;

//     const params = {
//         AuthFlow: 'USER_PASSWORD_AUTH',
//         ClientId: process.env.COGNITO_CLIENT_ID,
//         AuthParameters: { USERNAME: username, PASSWORD: password },
//     };

//     try {
//         const data = await cognito.initiateAuth(params).promise();
//         res.json(data.AuthenticationResult);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // MFA Verification handler
// const verifyMfa = async (req, res) => {
//     const { session, mfaCode, username } = req.body;

//     const params = {
//         ClientId: process.env.COGNITO_CLIENT_ID,
//         ChallengeName: 'SMS_MFA',
//         Session: session,
//         ChallengeResponses: {
//             SMS_MFA_CODE: mfaCode,
//             USERNAME: username,
//         },
//     };

//     try {
//         const data = await cognito.respondToAuthChallenge(params).promise();
//         res.json(data.AuthenticationResult);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Token refresh handler
// const refreshToken = async (req, res) => {
//     const { refreshToken } = req.body;

//     const params = {
//         AuthFlow: 'REFRESH_TOKEN_AUTH',
//         ClientId: process.env.COGNITO_CLIENT_ID,
//         AuthParameters: { REFRESH_TOKEN: refreshToken },
//     };

//     try {
//         const data = await cognito.initiateAuth(params).promise();
//         res.json(data.AuthenticationResult);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Protected route handler
// const protectedRoute = (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// };

// module.exports = { loginUser, verifyMfa, refreshToken, protectedRoute };


const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const User = require("../models/userModel")
// AWS Cognito Setup
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
});

// Verify Token API
const verify_token = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Decode and validate token
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decodedToken.exp <= currentTime) {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Extract user info from token
    const { email, username, picture } = decodedToken;

    // Check if user exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: username || email.split('@')[0],
        email,
        profilePicture: picture,
      });
      await user.save();
      console.log('New user created:', user);
    } else {
      console.log('User already exists:', user);
    }

    res.json({ message: 'Token validated and user saved', user });
  } catch (error) {
    console.error('Error validating token or saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { verify_token };

