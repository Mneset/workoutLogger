module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            field: 'role_id'
        },
        workoutPlanId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'workout_plan_id'
        },
    }, {
        tableName: 'users'
    });

    // Associations

    User.associate = (db) => {
        db.User.belongsTo(db.Role, { foreignKey: 'roleId' });
        db.User.hasMany(db.SessionLog, { foreignKey: 'userId' });
        db.User.belongsTo(db.WorkoutPlan, { foreignKey: 'workoutPlanId' });
    };

    return User;
};