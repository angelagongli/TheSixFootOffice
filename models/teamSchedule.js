module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const TeamSchedule = sequelize.define("TeamSchedule", {
        weekOf: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date(today.setDate(today.getDate() - today.getDay()))
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

    TeamSchedule.associate = function(models) {
        TeamSchedule.belongsTo(models.Team, {
            foreignKey: {
                allowNull: false
            }
        });
        TeamSchedule.hasMany(models.Event, {
            onDelete: "cascade"
        });
    };

    return TeamSchedule;
};
