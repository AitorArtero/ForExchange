const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas que requieren autenticación (token)
router.get('/profile', auth, authController.getProfile);
router.delete('/profile', auth, authController.deleteAccount);
router.post('/logout', auth, authController.logout);

module.exports = router;