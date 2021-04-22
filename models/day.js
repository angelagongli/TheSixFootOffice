module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const Day = sequelize.define("Day", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: today
        },
        inOfficeRequirement: {
            type: DataTypes.ENUM("In Office All Day", "In Office AM", "In Office PM", "Home", "Day Off"),
            allowNull: false,
            defaultValue: "In Office All Day"
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

    Day.associate = function(models) {
        Day.belongsTo(models.EmployeeSchedule, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Day;
};
