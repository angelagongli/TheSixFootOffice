module.exports = function(sequelize, DataTypes) {
    const Employee = sequelize.define("Employee", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seatNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nearestNeighborID: DataTypes.INTEGER,
        isFullyVaccinatedAgainstCoronavirus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isWorkingNineEightySchedule: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cumulativeInPersonAttendance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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

    Employee.associate = function(models) {
        Employee.belongsTo(models.Team, {
            foreignKey: {
                allowNull: false
            }
        });
        Employee.hasMany(models.EmployeeSchedule);
    };

    return Employee;
};
