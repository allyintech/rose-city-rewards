const jwt = require('jsonwebtoken');

// Middleware function to authenticate tokens
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

    // If no token is provided, block access
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' }); // Invalid token

        req.user = user; // Attach user info to the request
        next(); // Allow request to proceed
    });
};

module.exports = authenticateToken;
