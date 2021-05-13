module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const OfficeSetting = sequelize.define("OfficeSetting", {
        weekOf: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date(today.setDate(today.getDate() - today.getDay()))
        },
        maxAllowedOfficeCapacityPercentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        isMaskWearingRequired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        officeCityReopeningPhase: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Phase IV: Gradually Resume"
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

    return OfficeSetting;
};
