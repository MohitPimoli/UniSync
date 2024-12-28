const User = require('../models/User');
require('dotenv').config();

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const profileApi = process.env.PROFILE_API;
        const photoUrl = user.profilePicture
            ? `${profileApi}uploads/${user.profilePicture}`
            : `${profileApi}uploads/user.png`;

        res.json({
            user: user.toObject(),
            photoUrl: photoUrl,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

module.exports = {
    getUserProfile,
};
