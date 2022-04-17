const router = require('express').Router();
const { verifyToken } = require('../auth');

const { login, register, logout } = require('../controllers/auth.controller');



// ************************ LOGIN  ************************ //
router.post('/login', login);


// ************************ SIGNUP ************************ //
router.post('/register', register);


// ***********************  LOGOUT  *********************** //
router.get('/logout', verifyToken, logout);


module.exports = router;