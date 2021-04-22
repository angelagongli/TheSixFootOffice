module.exports = function(sequelize, DataTypes) {
    const Team = sequelize.define("Team", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        }
    });

    Team.associate = function(models) {
        Team.hasMany(models.Employee);
        Team.hasMany(models.TeamSchedule);
        Team.hasMany(models.RecurringEvent);
    };

    return Team;
};
