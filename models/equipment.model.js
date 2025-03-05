module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
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

    Equipment.associate = (db) => {
        db.Equipment.belongsToMany(db.Exercise, { through: 'exerciseEquipment', foreignKey: 'equipmentId' });
    }

    return Equipment;
};