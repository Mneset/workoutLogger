module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define('Exercise', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });

    // Associations

    Exercise.associate = (db) => {
        db.Exercise.hasMany(db.ExerciseLog, { foreignKey: 'exerciseId' });
        db.Exercise.belongsToMany(db.Category, { through: 'ExerciseCategory', foreignKey: 'exerciseId' });
        db.Exercise.belongsToMany(db.Equipment, { through: 'ExerciseEquipment', foreignKey: 'exerciseId' });
        db.Exercise.belongsToMany(db.TargetMuscle, { through: 'ExerciseTargetMuscle', foreignKey: 'exerciseId' });
    }
    return Exercise;
};