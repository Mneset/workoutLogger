module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
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

    Category.associate = (db) => {
        db.Category.belongsToMany(db.Exercise, { through: 'exerciseCategory', foreignKey: 'categoryId' });
    }

    return Category;
};