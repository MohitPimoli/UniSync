const express = require('express');
const router = express.Router();
const { getNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const authenticate = require('../middleware/authenticate');

// Fetch notifications
router.get('/notifications', authenticate, getNotifications);

// Mark a notification as read
router.put('/notifications/:id/markAsRead', authenticate, markNotificationAsRead);

module.exports = router;
