const express = require('express');
const router = express.Router();
const db = require('../models');
const SessionService = require('../services/SessionService');
const sessionService = new SessionService(db);

router.post('/session', async (req, res) => {
    const { userId} = req.body;
    try {
        const session = await sessionService.startSession(userId);
        res.status(201).json({ session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to start session' });
        
    }
});

router.post('/session/exercise', async (req, res) => {
    const { exerciseId, setId, reps, weight, notes, sessionLogId } = req.body;
    try {
        const session = await sessionService.addExerciseLogToSession(exerciseId, setId, reps, weight, notes, sessionLogId);
        res.status(201).json({ session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add exerciseLog' });
        
    }
});

module.exports = router;