const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/usersController');
const router = express.Router();

router.post('/register', registerUser);  // Register a user
router.post('/login', loginUser);        // Login a user
router.put('/profile', updateUserProfile); // Update user profile

module.exports = router;
