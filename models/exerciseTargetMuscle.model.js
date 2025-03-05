module.exports = (sequelize, DataTypes) => {
    const ExerciseTargetMuscle = sequelize.define('ExerciseTargetMuscle', {
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        targetMuscleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    });

    // Associations

    ExerciseTargetMuscle.associate = (db) => {
        db.ExerciseTargetMuscle.belongsTo(db.Exercise, { foreignKey: 'exerciseId' });
        db.ExerciseTargetMuscle.belongsTo(db.TargetMuscle, { foreignKey: 'targetMuscleId' });
    };

    return ExerciseTargetMuscle;
};