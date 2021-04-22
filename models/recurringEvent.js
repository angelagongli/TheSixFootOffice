module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const RecurringEvent = sequelize.define("RecurringEvent", {
        name: DataTypes.STRING,
        dayOfWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: today.getDay()
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        frequency: {
            type: DataTypes.ENUM("Weekly", "Biweekly", "Monthly"),
            allowNull: false,
            defaultValue: "Weekly"
        },
        weekOfMonth: DataTypes.INTEGER,
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

    RecurringEvent.associate = function(models) {
        RecurringEvent.belongsTo(models.Team, {
            foreignKey: {
                allowNull: false
            }
        });
        RecurringEvent.hasMany(models.Event);
    };

    return RecurringEvent;
};
