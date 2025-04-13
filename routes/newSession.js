const express = require('express');
const router = express.Router();
const db = require('../models');
const SessionService = require('../services/SessionService');
const sessionService = new SessionService(db);
const checkForUser = require('../utils/userCreator');

router.use(checkForUser);

router.post('/new-session', async (req, res) => {
    const { userId } = req.body;
    console.log('req.auth:', req.auth.payload.sub); 
    console.log(req.body);  
    
    if(req.auth.payload.sub !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    try {
        const session = await sessionService.startSession(userId);
        res.status(201).json({ session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to start session' });
    }
});

router.post('/new-session/exercise', async (req, res) => {
    const { exerciseId, setId, reps, weight, notes, sessionLogId } = req.body;
    try {
        const exerciseLog = await sessionService.addExerciseLogToSession(exerciseId, setId, reps, weight, notes, sessionLogId);
        res.status(201).json({ exerciseLog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add exerciseLog' }); 
    }
});

router.put('/new-session/end', async (req, res) => {
    const { sessionNotes, sessionLogId } = req.body;
    try {
        const session = await sessionService.endSession(sessionNotes, sessionLogId);
        res.status(200).json({ session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to end session' });
    }
});

router.get('/new-session/:id', async (req, res) => {
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