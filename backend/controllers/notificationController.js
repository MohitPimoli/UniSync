const Notification = require('../models/notification');

// Fetch notifications for a user
const getNotifications = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        notification.isRead = true;
        await notification.save();
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getNotifications, markNotificationAsRead };
