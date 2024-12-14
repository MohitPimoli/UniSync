const User = require('../models/user');
require('dotenv').config();

const getUserProfile = async (req, res) => {
    try {
        // Fetch user from DB using the user ID extracted from the JWT token
        const user = await User.findById(req.user.userId).select('Name Email Username resetPasswordToken resetPasswordExpires');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming user's profile picture is stored in 'uploads' directory
        const profileApi = process.env.PROFILE_API;
        const photoUrl = user.profilePicture
            ? `${profileApi}uploads/${user.profilePicture}`
            : `${profileApi}uploads/user.png`;

        res.json({
            name: user.Name,
            username: user.Username,
            email: user.Email,
            photoUrl: photoUrl, // Return the photo URL relative to the uploads folder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

module.exports = {
    getUserProfile,
};
