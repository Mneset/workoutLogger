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
        }      
    });

    // Associations

    Exercise.associate = (db) => {
        db.Exercise.hasMany(db.ExerciseLog, { foreignKey: 'exerciseId' });
        db.Exercise.belongsToMany(db.Category, { through: 'exerciseCategory', foreignKey: 'exerciseId' });
        db.Exercise.belongsToMany(db.Equipment, { through: 'exerciseEquipment', foreignKey: 'exerciseId' });
        db.Exercise.belongsToMany(db.TargetMuscle, { through: 'exerciseTargetMuscle', foreignKey: 'exerciseId' });
    }
    return Exercise;
};