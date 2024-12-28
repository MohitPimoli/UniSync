const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    profilePicture: { type: String, default: 'user.png' },
    fieldOfInterest: { type: [String], default: [] },
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
