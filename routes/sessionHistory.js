const express = require('express');
const router = express.Router();
const db = require('../models');
const SessionService = require('../services/SessionService');
const sessionService = new SessionService(db);

router.get('/session-history', async (req, res) => {
    const { userId } = req.query;
    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const sessions = await sessionService.getSessionsByUserId(userId);
        res.status(200).json({ sessions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get sessions' });
    }
})

module.exports = router;