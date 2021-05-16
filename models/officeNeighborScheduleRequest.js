module.exports = function(sequelize, DataTypes) {
    const OfficeNeighborScheduleRequest = sequelize.define("OfficeNeighborScheduleRequest", {
        officeNeighborScheduleRequestPhase: {
            type: DataTypes.ENUM("Submitted", "Re-Submitted"),
            allowNull: false,
            defaultValue: "Submitted"
        },
        nearestOfficeNeighborRole: {
            type: DataTypes.ENUM("NearestOfficeNeighborA", "NearestOfficeNeighborB"),
            allowNull: false,
            defaultValue: "NearestOfficeNeighborA"
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

    OfficeNeighborScheduleRequest.associate = function(models) {
        OfficeNeighborScheduleRequest.belongsTo(models.OfficeNeighborScheduleResolution, {
            foreignKey: {
                allowNull: false
            }
        });
        OfficeNeighborScheduleRequest.hasMany(models.OfficeNeighborScheduleRequestDay, {
            onDelete: "cascade"
        });
    };

    return OfficeNeighborScheduleRequest;
};
