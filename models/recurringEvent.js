module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const RecurringEvent = sequelize.define("RecurringEvent", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: today
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: today
        },
        frequency: {
            type: DataTypes.ENUM("Daily", "Weekly", "Biweekly", "Monthly"),
            allowNull: false,
            defaultValue: "Weekly"
        },
        dayOfWeek: {
            type: DataTypes.INTEGER,
            defaultValue: today.getDay()
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
