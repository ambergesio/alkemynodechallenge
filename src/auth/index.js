const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (!token) {
        return res.status(403).redirect('/login.html');
    }
    try {
        const verified = jwt.verify(token, config.secret);
        req.user = verified;
        next();
    }
    catch (error) {
        throw error;
    }
};

const protectedRoute = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (!token) {
        return res.status(403).redirect('/login');
    }
    try {
        const verified = jwt.verify(token, config.secret);
        req.user = verified;
        next();
    }
    catch (error) {
        throw error;
    }
};

module.exports = { verifyToken, protectedRoute };
