module.exports = function(sequelize, DataTypes) {
    const Visitor = sequelize.define("Visitor", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reasonNecessitatingVisit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isFullyVaccinatedAgainstCoronavirus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isImmunocompromised: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isSickWithCoronavirus: {
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

    Visitor.associate = function(models) {
        Visitor.belongsTo(models.Employee, {
            as: "employeeVisiting",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Visitor;
};
