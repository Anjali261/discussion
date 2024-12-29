
const express = require("express");
const bodyParser = require("body-parser");
const AWS = require('aws-sdk');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const cors = require("cors");
const app = express();
const port = 4000;

AWS.config.update({ region: 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();
const CLIENT_ID = '4n8b86n4jajcg8h63j2nug37ft'; 
const CLIENT_SECRET = 'oen2nldsr843v2abhr5iqg58sm4efoo3nr2j5ljc53uiejin5t6';  

app.use(bodyParser.json());
app.use(cors());

const calculateSecretHash = (username) => {
    const hmac = crypto.createHmac('sha256', CLIENT_SECRET);
    hmac.update(username + CLIENT_ID);  // Client ID + Username
    return hmac.digest('base64');
};




const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Received token:', token); 
    if (token) {
        jwt.verify(token, 'anjali', (err, user) => {
            if (err) {
                console.log('JWT verification failed:', err); 
                return res.sendStatus(403); 
            }
            req.user = user;
            next();
        });
    } else {
        console.log('No token provided'); 
        res.sendStatus(401);
    }
};






app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        Password: password,
        UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'name', Value: username }
        ],
        SecretHash: calculateSecretHash(username)
    };

    try {
        const data = await cognito.signUp(params).promise();
        console.log("Signup success:", data); 
        res.status(200).json({ 
            success: true, 
            message: 'User registered successfully. OTP sent to email.', 
            username 
        });
    } catch (err) {
        console.error("Signup error:", err); 
        res.status(400).json({ 
            success: false, 
            message: 'Signup failed.', 
            error: err.message 
        });
    }
});




app.post('/confirm', async (req, res) => {
    const { username, confirmationCode } = req.body;

    if (!username || !confirmationCode) {
        return res.status(400).json({ message: 'Username and Confirmation Code are required' });
    }

    const SECRET_HASH = calculateSecretHash(username);

    const params = {
        ClientId: CLIENT_ID,
        Username: username,
        ConfirmationCode: confirmationCode,
        SecretHash: SECRET_HASH,
    };

    try {
        const data = await cognito.confirmSignUp(params).promise();
        if (data.UserConfirmed) {
            res.json({ success: true, message: 'OTP Verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'OTP verification failed' });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});


// Signin Route with SECRET_HASH

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: calculateSecretHash(username) // Include SECRET_HASH here
        }
    };

    try {
        const data = await cognito.initiateAuth(params).promise();
        const token = jwt.sign({ username: data.AuthenticationResult.AccessToken }, 'anjali', { expiresIn: '1h' });
     
              // Assuming you have the user information from Cognito or your database
      const user = { username }; // Add any additional user data here

      res.json({ token, user }); 
    } catch (err) {
        res.status(400).json(err);
    }
});

// Protected Route
app.get('/demoPage', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the protected route' });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
});

// Logout Route
app.post('/logout', authenticateJWT, async (req, res) => {
    const token = req.headers.authorization;

    const params = {
        AccessToken: token,
    };

    try {
        await cognito.globalSignOut(params).promise();
        res.json({ message: 'Successfully logged out' });
    } catch (err) {
        res.status(400).json(err);
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


