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
        sessionDateStart: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'session_date_start'
        },
        sessionDateEnd: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'session_date_end'
        },
        workoutHistoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'workout_history_id'
        }
    }, {
        tableName: 'sessionlog'
    });

    // Associations

    SessionLog.associate = (db) => {
        db.SessionLog.belongsTo(db.User, { foreignKey: 'userId' });
        db.SessionLog.hasMany(db.ExerciseLog);
        db.SessionLog.belongsTo(db.WorkoutHistory, { foreignKey: 'workoutHistoryId' });
    }

    return SessionLog;
};

