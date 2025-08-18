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

    async endSession(notes, sessionLogId, updatedLogs, name) {
    const t = await this.db.sequelize.transaction();
    try {
        await this.db.SessionLog.update({
            notes: notes,
            sessionDateEnd: new Date(),
            name: name
        }, {
            where: { id: sessionLogId },
            transaction: t
        });

        if (Array.isArray(updatedLogs)) {
            for (const log of updatedLogs) {
                await this.db.ExerciseLog.update(
                    {
                        reps: log.reps,
                        weight: log.weight,
                        notes: log.notes
                    },
                    {
                        where: { id: log.id },
                        transaction: t
                    }
                );
            }
        }

        await t.commit();
        return true;
    } catch (error) {
        await t.rollback();
        throw error;
    }
}

    async getAllExercises() {
        try {
            const exercises = await this.db.Exercise.findAll({
                 include: [
                {
                    model: this.db.TargetMuscle,
                    through: { attributes: [] } // Exclude junction table columns
                }
            ]
            })
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
    
    async updateExerciseLog(reps, weight, notes, exerciseLogId) {
        try {
            const exerciseLog = await this.db.ExerciseLog.update(
                { reps, weight, notes },
                { where: { id: exerciseLogId } }
            );
            return exerciseLog;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = SessionService;