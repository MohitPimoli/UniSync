const mongoose = require('mongoose');
const Connection = require('../models/connection');
const User = require('../models/user');
const io = require('../server'); // Assuming you have a socket.js file to initialize Socket.io
const { createNotification } = require('../controllers/notificationController');

const sendRequest = async (req, res, next) => {
    const { receiverId } = req.body;
    const senderId = req.user.userId;

    try {
        const receiver = await User.findById(receiverId);
        if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

        let senderConnection = await Connection.findOneAndUpdate(
            { userId: senderId },
            { $setOnInsert: { connections: [], requests: [], blockedUsers: [] } },
            { new: true, upsert: true }
        );

        let receiverConnection = await Connection.findOneAndUpdate(
            { userId: receiverId },
            { $setOnInsert: { connections: [], requests: [], blockedUsers: [] } },
            { new: true, upsert: true }
        );

        const existingRequest = receiverConnection.requests.find(
            (req) => req.requesterId.toString() === senderId && req.status === 'pending'
        );
        if (existingRequest) return res.status(400).json({ message: 'Request already sent' });

        receiverConnection.requests.push({ requesterId: senderId, status: 'pending' });
        await receiverConnection.save();

        await createNotification(
            receiverId,
            'friend_request',
            `${req.user.name} sent you a friend request`,
            senderId
        );

        io.emit('connectionRequestSent', { senderId, receiverId });
        io.emit('notification', { userId: receiverId, message: `${req.user.name} sent you a friend request` });

        res.status(200).json({ message: 'Connection request sent' });
    } catch (error) {
        next(error);
    }
};

const acceptRequest = async (req, res, next) => {
    const { requesterId } = req.body;
    const receiverId = req.user.userId;

    try {
        const receiverConnection = await Connection.findOne({ userId: receiverId });
        if (!receiverConnection) return res.status(404).json({ message: 'Connection requests not found' });

        const requestIndex = receiverConnection.requests.findIndex(
            (req) => req.requesterId.toString() === requesterId && req.status === 'pending'
        );
        if (requestIndex === -1) return res.status(400).json({ message: 'Request not found' });

        receiverConnection.requests[requestIndex].status = 'accepted';
        receiverConnection.connections.push(requesterId);
        await receiverConnection.save();

        await Connection.findOneAndUpdate(
            { userId: requesterId },
            { $push: { connections: receiverId } },
            { new: true, upsert: true }
        );

        io.emit('connectionRequestAccepted', { requesterId, receiverId });

        res.status(200).json({ message: 'Connection request accepted' });
    } catch (error) {
        next(error);
    }
};

const rejectRequest = async (req, res, next) => {
    const { requesterId } = req.body;
    const receiverId = req.user.userId;

    try {
        const receiverConnection = await Connection.findOne({ userId: receiverId });
        if (!receiverConnection) return res.status(404).json({ message: 'Connection requests not found' });

        const requestIndex = receiverConnection.requests.findIndex(
            (req) => req.requesterId.toString() === requesterId && req.status === 'pending'
        );
        if (requestIndex === -1) return res.status(400).json({ message: 'Request not found' });

        receiverConnection.requests[requestIndex].status = 'rejected';
        await receiverConnection.save();

        io.emit('connectionRequestRejected', { requesterId, receiverId });

        res.status(200).json({ message: 'Connection request rejected' });
    } catch (error) {
        next(error);
    }
};

const getConnections = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const connections = await Connection.findOne({ userId }).populate('connections', 'name username');

        if (!connections) return res.status(404).json({ message: 'No connections found' });

        res.status(200).json(connections.connections);
    } catch (error) {
        next(error);
    }
};

const getConnectionRequests = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const connection = await Connection.findOne({ userId }).populate('requests.requesterId', 'name username');

        if (!connection) return res.status(404).json({ message: 'No connection requests found' });

        const pendingRequests = connection.requests.filter(req => req.status === 'pending');
        res.status(200).json(pendingRequests);
    } catch (error) {
        next(error);
    }
};

const getFriendSuggestions = async (req, res, next) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).populate('connections', '_id');
        const userConnectionIds = user.connections.map(conn => conn._id.toString());

        const suggestions = await User.find({
            _id: { $nin: [userId, ...userConnectionIds] },
            fieldOfInterest: { $in: user.fieldOfInterest }
        })
            .limit(10)
            .lean();

        const enrichedSuggestions = await Promise.all(
            suggestions.map(async (suggestion) => {
                const mutualFriendCount = await Connection.countDocuments({
                    userId: suggestion._id,
                    connections: { $in: userConnectionIds }
                });

                return {
                    ...suggestion,
                    mutualFriendCount,
                };
            })
        );

        enrichedSuggestions.sort((a, b) => b.mutualFriendCount - a.mutualFriendCount);

        res.status(200).json(enrichedSuggestions);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendRequest,
    acceptRequest,
    rejectRequest,
    getConnections,
    getConnectionRequests,
    getFriendSuggestions
};
