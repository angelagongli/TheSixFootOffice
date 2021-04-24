const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Team.findAll()
        .then(dbTeamsAll => {
            res.json(dbTeamsAll);
        });
    },
    update: function(req, res) {
        db.Team.update(req.body, {
            where: { id: req.params.id }
        }).then(dbTeam => {
            res.json(dbTeam);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.Team.create(req.body)
        .then(dbTeam => {
            res.json(dbTeam);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
