// Defining model

module.exports = (sequelize, DataTypes) => {
    const WorkoutHistory = sequelize.define('WorkoutHistory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    // Associations

    WorkoutHistory.associate = (db) => {
        db.WorkoutHistory.belongsTo(db.User, { foreignKey: 'userId' });
        db.WorkoutHistory.hasMany(db.SessionLog, { foreignKey: 'sessionLogId' });
    };

    return WorkoutHistory;
};
