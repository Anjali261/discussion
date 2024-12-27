const jwt = require('jsonwebtoken');

const verifyJWTToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.COGNITO_PUBLIC_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;  // Attach decoded user data to the request object
    next();
  });
};

module.exports = { verifyJWTToken };
