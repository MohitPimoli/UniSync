const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/userController');

// Get user profile data
router.get('/profile', authenticate, userController.getUserProfile);

module.exports = router;
