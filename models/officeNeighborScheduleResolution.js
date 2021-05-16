module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const OfficeNeighborScheduleResolution = sequelize.define("OfficeNeighborScheduleResolution", {
        weekOf: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date(today.setDate(today.getDate() - today.getDay()))
        },
        officeNeighborScheduleResolutionPhase: {
            type: DataTypes.ENUM("Requested", "Submitted", "Being Reconciled", "Completed/Resolved"),
            allowNull: false,
            defaultValue: "Requested"
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

    OfficeNeighborScheduleResolution.associate = function(models) {
        OfficeNeighborScheduleResolution.belongsTo(models.Employee, {
            as: "NearestOfficeNeighborA",
            foreignKey: {
                allowNull: false
            }
        });
        OfficeNeighborScheduleResolution.belongsTo(models.Employee, {
            as: "NearestOfficeNeighborB",
            foreignKey: {
                allowNull: false
            }
        });
        OfficeNeighborScheduleResolution.hasMany(models.OfficeNeighborScheduleRequest, {
            onDelete: "cascade"
        });
        OfficeNeighborScheduleResolution.hasMany(models.OfficeNeighborScheduleResult, {
            onDelete: "cascade"
        });
    };

    return OfficeNeighborScheduleResolution;
};
