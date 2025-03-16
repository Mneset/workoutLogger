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

router.put('/session/end', async (req, res) => {
    const { sessionNotes, sessionLogId } = req.body;
    try {
        const session = await sessionService.endSession(sessionNotes, sessionLogId);
        res.status(200).json({ session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to end session' });
    }
});

router.get('/session', async (req, res) => {
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

router.get('/session/:id', async (req, res) => {
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