// mern-app/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), 'your_secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};
