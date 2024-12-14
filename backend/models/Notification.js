const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'friend_request', 'post_like', 'post_comment'
    message: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: who triggered the notification
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Optional: if related to a post
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
