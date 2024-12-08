const User = require('../models/user'); // Import User model

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        // Fetch user from DB using the user ID extracted from the JWT token
        const user = await User.findById(req.user.userId).select('Name Email Username resetPasswordToken resetPasswordExpires');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming user's profile picture is stored in 'uploads' directory
        const photoUrl = user.profilePicture
            ? `/uploads/${user.profilePicture}` // Use stored filename
            : '/uploads/user.jpg';

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
