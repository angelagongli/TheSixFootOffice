module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const Event = sequelize.define("Event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: today
        },
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
        isRecurring: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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

    Event.associate = function(models) {
        Event.belongsTo(models.TeamSchedule, {
            foreignKey: {
                allowNull: false
            }
        });
        Event.belongsTo(models.RecurringEvent);
    };

    return Event;
};
