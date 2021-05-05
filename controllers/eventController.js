const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
    findAll: function(req, res) {
        db.Event.findAll({
            include: {
                model: db.TeamSchedule
            },
            order: [['date', 'DESC'], ['startTime']]
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
            order: [['date', 'DESC'], ['startTime']]
        }).then(dbEventsOfTeamScheduleAll => {
            res.json(dbEventsOfTeamScheduleAll);
        });
    },
    findAllByDate: function(req, res) {
        db.Event.findAll({
            include: {
                model: db.TeamSchedule
            },
            where: { date: req.params.date },
            order: [['startTime']]
        }).then(dbEventsOnDateAll => {
            res.json(dbEventsOnDateAll);
        });
    },
    findAllUpcomingFollowingDate: function(req, res) {
        db.Event.findAll({
            include: {
                model: db.TeamSchedule
            },
            where: {
                date: {
                    [Op.gte]: req.params.date
                }
            },
            order: [['date', 'DESC'], ['startTime']]
        }).then(dbUpcomingEventsAll => {
            res.json(dbUpcomingEventsAll);
        });
    },
    update: function(req, res) {
        db.Event.update(req.body, {
            where: { id: req.params.id }
        }).then(dbEvent => {
            res.json(dbEvent);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.Event.create(req.body)
        .then(dbEvent => {
            res.json(dbEvent);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
