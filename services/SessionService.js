class SessionService {
    constructor(db) {
        this.db = db;
    }

    async getSessionsByUserId(userId) {
        try {
            const sessions = await this.db.SessionLog.findAll({
                where: { userId: userId },
                include: [{
                    model: this.db.ExerciseLog,
                    include: [ this.db.Exercise ]
                }]
            });
            return sessions;
        } catch (error) {
            throw error;
        }
    }

    async getSessionById(id) {
        try {
            const session = await this.db.SessionLog.findOne({
                where: { id: id },
                include: [{
                    model: this.db.ExerciseLog,
                    include: [ this.db.Exercise ]
                }]
            });
            return session;
        } catch (error) {
            throw error;
        }
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

    async endSession(notes, sessionLogId, workoutHistoryId) {
        try {
            const session = this.db.SessionLog.update({
                notes: notes,
                sessionDateEnd: new Date(),
                workoutHistoryId: workoutHistoryId
            }, {
                where: { id: sessionLogId }
            });
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getAllExercises() {
        try {
            const exercises = await this.db.Exercise.findAll()
            return exercises;
        } catch (error) {
            throw error;
        }
    }
    
    async getAllSetTypes() {
        try {
            const setTypes = await this.db.Set.findAll()
            return setTypes;
        } catch (error) {
            throw error;
        }
    }

    async deleteSession(sessionLogId) {
        try {
            const session = await this.db.SessionLog.destroy({
                where: { id: sessionLogId }
            });
            return session;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = SessionService;