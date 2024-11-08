const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    requests: [{
        requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'] }
    }]
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
