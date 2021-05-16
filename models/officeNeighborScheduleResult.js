module.exports = function(sequelize, DataTypes) {
    const OfficeNeighborScheduleResult = sequelize.define("OfficeNeighborScheduleResult", {
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

    OfficeNeighborScheduleResult.associate = function(models) {
        OfficeNeighborScheduleResult.belongsTo(models.OfficeNeighborScheduleResolution, {
            foreignKey: {
                allowNull: false
            }
        });
        OfficeNeighborScheduleResult.hasMany(models.OfficeNeighborScheduleResultDay, {
            onDelete: "cascade"
        });
    };

    return OfficeNeighborScheduleResult;
};
