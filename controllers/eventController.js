const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Event.findAll({
            include: {
                model: db.TeamSchedule
            },
            order: [['date', 'DESC']]
        }).then(dbEventsAll => {
            res.json(dbEventsAll);
        });
    },
    findAllByTeamSchedule: function(req, res) {
        db.Event.findAll({
            include: {
                model: db.TeamSchedule
            },
            where: { TeamScheduleId: req.params.id },
            order: [['date', 'DESC']]
        }).then(dbEventsOfTeamScheduleAll => {
            res.json(dbEventsOfTeamScheduleAll);
        });
    },
    findAllByDate: function(req, res) {
        db.Event.findAll({
            include: {
                model: db.TeamSchedule
            },
            where: { date: req.params.date }
        }).then(dbEventsOnDateAll => {
            res.json(dbEventsOnDateAll);
        });
    }
}
