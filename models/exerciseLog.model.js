module.exports = (sequelize, DataTypes) => {
    const ExerciseLog = sequelize.define('ExerciseLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'exercise_id'
        },
        setId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'set_id'
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sessionLogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'session_log_id'
        }
    });

    // Associations

    ExerciseLog.associate = (db) => {
        db.ExerciseLog.belongsTo(db.Exercise, { foreignKey: 'exerciseId' });
        db.ExerciseLog.belongsTo(db.SessionLog, { foreignKey: 'sessionLogId' });
        db.ExerciseLog.belongsTo(db.Set, { foreignKey: 'setId' });
    }

    return ExerciseLog;
};
