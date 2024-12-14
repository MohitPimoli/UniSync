const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Friend connections
    requests: [{
        requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who sent the request
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Request status
        createdAt: { type: Date, default: Date.now } // Request creation date
    }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Users blocked by the owner
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Connection = mongoose.models.Connection || mongoose.model('Connection', connectionSchema);

module.exports = Connection;
