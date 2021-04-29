const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.EmployeeSchedule.findAll({
            include: [
                {
                    model: db.Employee
                },
                {
                    model: db.Day
                }
            ],
            order: [['weekOf', 'DESC']]
        }).then(dbEmployeeSchedulesAll => {
            res.json(dbEmployeeSchedulesAll);
        });
    },
    findAllByEmployee: function(req, res) {
        db.EmployeeSchedule.findAll({
            include: [
                {
                    model: db.Employee
                },
                {
                    model: db.Day
                }
            ],
            where: { EmployeeId: req.params.id },
            order: [['weekOf', 'DESC']]
        }).then(dbEmployeeSchedulesOfEmployeeAll => {
            res.json(dbEmployeeSchedulesOfEmployeeAll);
        });
    },
    findByEmployeeWeek: function(req, res) {
        db.EmployeeSchedule.findOne({
            include: [
                {
                    model: db.Employee
                },
                {
                    model: db.Day
                }
            ],
            where: { 
                EmployeeId: req.params.id,
                weekOf: req.params.week
            }
        }).then(dbEmployeeScheduleOfEmployeeWeek => {
            res.json(dbEmployeeScheduleOfEmployeeWeek);
        });
    },
    findAllByTeam: function(req, res) {
        db.EmployeeSchedule.findAll({
            include: [
                {
                    model: db.Employee,
                    where: {
                        TeamId: req.params.id
                    }
                },
                {
                    model: db.Day
                }
            ],
            order: [['weekOf', 'DESC']]
        }).then(dbEmployeeSchedulesInTeamAll => {
            res.json(dbEmployeeSchedulesInTeamAll);
        });
    },
    findAllByTeamWeek: function(req, res) {
        db.EmployeeSchedule.findAll({
            include: [
                {
                    model: db.Employee,
                    where: {
                        TeamId: req.params.id
                    }
                },
                {
                    model: db.Day
                }
            ],
            where: { weekOf: req.params.week }
        }).then(dbEmployeeSchedulesInTeamWeekAll => {
            res.json(dbEmployeeSchedulesInTeamWeekAll);
        });
    },
    findAllByWeek: function(req, res) {
        db.EmployeeSchedule.findAll({
            include: [
                {
                    model: db.Employee
                },
                {
                    model: db.Day
                }
            ],
            where: { weekOf: req.params.week }
        }).then(dbEmployeeSchedulesInWeekAll => {
            res.json(dbEmployeeSchedulesInWeekAll);
        });
    }
}
