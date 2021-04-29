const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Day.findAll({
            include: {
                model: db.EmployeeSchedule
            },
            order: [['date', 'DESC']]
        }).then(dbDaysAll => {
            res.json(dbDaysAll);
        });
    },
    findAllByEmployeeSchedule: function(req, res) {
        db.Day.findAll({
            include: {
                model: db.EmployeeSchedule
            },
            where: { EmployeeScheduleId: req.params.id },
            order: [['date', 'DESC']]
        }).then(dbDaysOfEmployeeScheduleAll => {
            res.json(dbDaysOfEmployeeScheduleAll);
        });
    },
    findAllByDate: function(req, res) {
        db.Day.findAll({
            include: {
                model: db.EmployeeSchedule
            },
            where: { date: req.params.date }
        }).then(dbDaysOnDateAll => {
            res.json(dbDaysOnDateAll);
        });
    }
}
