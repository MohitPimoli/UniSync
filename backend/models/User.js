const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    profilePicture: { type: String, default: 'user.png' },
    fieldOfInterest: { type: [String], default: [] }, // Interests for friend suggestions
    bio: { type: String, default: '' }, // Optional bio
    location: { type: String, default: '' }, // User's location
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 1st-degree connections
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
