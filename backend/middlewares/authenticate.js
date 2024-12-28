const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];


    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Error verifying token:", err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded.id;

        if (!userId) {
            console.log('User ID is missing in decoded token');
            return res.status(401).json({ message: 'User ID is missing in token' });
        }

        req.user = { id: userId };  // Attach the user ID to req.user
        next();
    });
};
