const express = require('express');
const router = express.Router();
const db = require('../models');
const SessionService = require('../services/SessionService');
const sessionService = new SessionService(db);
const checkForUser = require('../utils/userCreator');

router.use(checkForUser);

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

router.get('/session-history/:id', async (req, res) => {
    const { sessionLogId } = req.query;
    try {
        if(!sessionLogId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }
        const session = await sessionService.getSessionById(sessionLogId);
        res.status(200).json({ session});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get session'})
    }
})

module.exports = router;