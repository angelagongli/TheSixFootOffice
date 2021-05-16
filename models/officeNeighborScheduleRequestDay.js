module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const OfficeNeighborScheduleRequestDay = sequelize.define("OfficeNeighborScheduleRequestDay", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: today
        },
        inOfficeRequirementRequested: {
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

    OfficeNeighborScheduleRequestDay.associate = function(models) {
        OfficeNeighborScheduleRequestDay.belongsTo(models.OfficeNeighborScheduleRequest, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return OfficeNeighborScheduleRequestDay;
};
