module.exports = (sequelize, DataTypes) => {
    const SessionLog = sequelize.define('SessionLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sessionDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        workoutHistoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'workout_history_id'
        }
    });

    // Associations

    SessionLog.associate = (db) => {
        db.SessionLog.belongsTo(db.User, { foreignKey: 'userId' });
        db.SessionLog.hasMany(db.ExerciseLog);
        db.SessionLog.belongsTo(db.WorkoutHistory, { foreignKey: 'workoutHistoryId' });
    }

    return SessionLog;
};

