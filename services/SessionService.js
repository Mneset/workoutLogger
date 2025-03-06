class SessionService {
    constructor(db) {
        this.db = db;
    }

    async startSession(userId) {
        try {
            const session = await this.db.SessionLog.create({
                userId,
                sessionDateStart: new Date()
            });
            return session;
        } catch (error) {
            throw error;  
        }     
    }

    async addExerciseLogToSession(exerciseId, setId, reps, weight, notes, sessionLogId) {
        try {
            const exerciseLog = await this.db.ExerciseLog.create({
                exerciseId,
                setId,
                reps,
                weight,
                notes,
                sessionLogId
            })
            return exerciseLog
        } catch (error) {
            throw error;
        }
    }

    async endSession() {
        try {
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SessionService;