module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const Event = sequelize.define("Event", {
        name: DataTypes.STRING,
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: today
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
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
