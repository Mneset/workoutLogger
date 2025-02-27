module.exports = (sequelize, DataTypes) => {
    const SessionLog = sequelize.define('SessionLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reps: {
            type: DataTypes.INTEGER,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sessionDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    // Associations

    SessionLog.associate = (db) => {
        db.SessionLog.belongsTo(db.User, { foreignKey: 'userId' });
        db.SessionLog.hasMany(db.ExerciseLog, { foreignKey: 'exerciseLogId' });
    }

    return SessionLog;
};

