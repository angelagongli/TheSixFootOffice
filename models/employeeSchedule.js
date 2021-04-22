module.exports = function(sequelize, DataTypes) {
    const today = new Date();

    const EmployeeSchedule = sequelize.define("EmployeeSchedule", {
        weekOf: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date(today.setDate(today.getDate() - today.getDay()))
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

    EmployeeSchedule.associate = function(models) {
        EmployeeSchedule.belongsTo(models.Employee, {
            foreignKey: {
                allowNull: false
            }
        });
        EmployeeSchedule.hasMany(models.Day, {
            onDelete: "cascade"
        });
    };

    return EmployeeSchedule;
};
