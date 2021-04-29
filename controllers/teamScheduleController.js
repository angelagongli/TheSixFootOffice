const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.TeamSchedule.findAll({
            include: [
                {
                    model: db.Team
                },
                {
                    model: db.Event
                }
            ],
            order: [['weekOf', 'DESC']]
        }).then(dbTeamSchedulesAll => {
            res.json(dbTeamSchedulesAll);
        });
    },
    findAllByTeam: function(req, res) {
        db.TeamSchedule.findAll({
            include: [
                {
                    model: db.Team
                },
                {
                    model: db.Event
                }
            ],
            where: { TeamId: req.params.id },
            order: [['weekOf', 'DESC']]
        }).then(dbTeamSchedulesOfTeamAll => {
            res.json(dbTeamSchedulesOfTeamAll);
        });
    },
    findByTeamWeek: function(req, res) {
        db.TeamSchedule.findOne({
            include: [
                {
                    model: db.Team
                },
                {
                    model: db.Event
                }
            ],
            where: { 
                TeamId: req.params.id,
                weekOf: req.params.week
            }
        }).then(dbTeamScheduleOfTeamWeek => {
            res.json(dbTeamScheduleOfTeamWeek);
        });
    },
    findAllByWeek: function(req, res) {
        db.TeamSchedule.findAll({
            include: [
                {
                    model: db.Team
                },
                {
                    model: db.Event
                }
            ],
            where: { weekOf: req.params.week }
        }).then(dbTeamSchedulesInWeekAll => {
            res.json(dbTeamSchedulesInWeekAll);
        });
    }
}
