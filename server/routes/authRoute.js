const express = require('express');
const {
    loginUser,
    verifyMfa,
    refreshToken,
    // protectedRoute,
    verify_token
} = require('../controllers/authController');

const router = express.Router();

// Define routes
// router.post('/login', loginUser);
// router.post('/verify-mfa', verifyMfa);
// router.post('/refresh-token', refreshToken);
router.post('/api/verify-token', verify_token);


// router.get('/protected', protectedRoute);

module.exports = router;
