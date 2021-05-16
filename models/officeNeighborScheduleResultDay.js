module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const OfficeNeighborScheduleResultDay = sequelize.define("OfficeNeighborScheduleResultDay", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: today
        },
        inOfficeRequirement: {
            type: DataTypes.ENUM("In Office All Day", "In Office AM", "In Office PM", "Home"),
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

    OfficeNeighborScheduleResultDay.associate = function(models) {
        OfficeNeighborScheduleResultDay.belongsTo(models.OfficeNeighborScheduleResult, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return OfficeNeighborScheduleResultDay;
};
