const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.RecurringEvent.findAll({
            include: [
                {
                    model: db.Team
                },
                {
                    model: db.Event
                }
            ]
        }).then(dbRecurringEventsAll => {
            res.json(dbRecurringEventsAll);
        });
    },
    findAllByTeam: function(req, res) {
        db.RecurringEvent.findAll({
            include: [
                {
                    model: db.Team,
                    where: {
                        id: req.params.id
                    }
                },
                {
                    model: db.Event
                }
            ]
        }).then(dbRecurringEventsOfTeamAll => {
            res.json(dbRecurringEventsOfTeamAll);
        });
    },
    update: function(req, res) {
        db.RecurringEvent.update(req.body, {
            where: { id: req.params.id }
        }).then(dbRecurringEvent => {
            res.json(dbRecurringEvent);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.RecurringEvent.create(req.body)
        .then(dbRecurringEvent => {
            res.json(dbRecurringEvent);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
