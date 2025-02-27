module.exports = (sequelize, DataTypes) => {
    const ExerciseLog = sequelize.define('ExerciseLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
    });

    // Associations

    ExerciseLog.associate = (db) => {
        db.ExerciseLog.belongsTo(db.Exercise, { foreignKey: 'exerciseId' });
        db.ExerciseLog.belongsTo(db.SessionLog, { foreignKey: 'exerciseLogId' });
        db.ExerciseLog.belongsTo(db.Set, { foreignKey: 'setId' });
    }

    return ExerciseLog;
};
