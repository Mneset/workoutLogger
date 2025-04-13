const db = require('../models');
const axios = require('axios');

const checkForUser = async (req, res, next) => {
    try {
        const userId = req.auth.payload.sub;
        const accessToken = req.auth.token; // The raw JWT token

        // Fetch user info from Auth0 /userinfo endpoint
        const userInfoResponse = await axios.get('https://dev-n8xnfzfw0w26p6nq.us.auth0.com/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const { email, nickname } = userInfoResponse.data;

        // Check if user exists in the database
        let user = await db.User.findByPk(userId);

        if (!user) {
            user = await db.User.create({
                id: userId,
                email: email || `${userId}@example.com`, // Fallback email if not provided
                username: nickname || `user_${userId}`, // Fallback username if not provided
            });
            console.log('User created:', user);
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error checking for user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = checkForUser;