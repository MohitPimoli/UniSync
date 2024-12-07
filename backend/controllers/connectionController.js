const mongoose = require('mongoose');
const Connection = require('../models/connection');
const User = require('../models/user');

const sendRequest = async (req, res, next) => {
    const { receiverId } = req.body;
    const senderId = req.user.userId;

    try {
        const receiver = await User.findById(receiverId);
        if (!receiver) return res.status(404).json({ message: 'Receiver not found' });


        let senderConnection = await Connection.findOne({ userId: senderId });
        if (!senderConnection) {
            senderConnection = new Connection({ userId: senderId, connections: [], requests: [] });
        }

        let receiverConnection = await Connection.findOne({ userId: receiverId });
        if (!receiverConnection) {
            receiverConnection = new Connection({ userId: receiverId, connections: [], requests: [] });
        }

        const existingRequest = receiverConnection.requests.find(
            (req) => req.requesterId.toString() === senderId && req.status === 'pending'
        );
        if (existingRequest) return res.status(400).json({ message: 'Request already sent' });

        receiverConnection.requests.push({ requesterId: senderId, status: 'pending' });
        await receiverConnection.save();

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

        res.status(200).json({ message: 'Connection request rejected' });
    } catch (error) {
        next(error);
    }
};

const getConnections = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const connections = await Connection.findOne({ userId }).populate('connections', 'Name Username');

        if (!connections) return res.status(404).json({ message: 'No connections found' });

        res.status(200).json(connections.connections);
    } catch (error) {
        next(error);
    }
};

const getConnectionRequests = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const connection = await Connection.findOne({ userId }).populate('requests.requesterId', 'Name Username');

        if (!connection) return res.status(404).json({ message: 'No connection requests found' });

        const pendingRequests = connection.requests.filter(req => req.status === 'pending');
        res.status(200).json(pendingRequests);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendRequest,
    acceptRequest,
    rejectRequest,
    getConnections,
    getConnectionRequests
};
