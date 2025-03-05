module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });

    // Associations

    User.associate = (db) => {
        db.User.belongsTo(db.Role, { foreignKey: 'roleId' });
        db.User.hasMany(db.SessionLog, { foreignKey: 'userId' });
        db.User.hasOne(db.WorkoutHistory, { foreignKey: 'userId' });
    };

    return User;
};