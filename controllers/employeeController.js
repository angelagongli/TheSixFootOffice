const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Employee.findAll({
            order: [['TeamId']]
        }).then(dbEmployeesAll => {
            res.json(dbEmployeesAll);
        });
    },
    findAllByTeam: function(req, res) {
        db.Employee.findAll({
            where: { TeamId: req.params.id }
        }).then(dbEmployeesInTeamAll => {
            res.json(dbEmployeesInTeamAll);
        });
    },
    update: function(req, res) {
        db.Employee.update(req.body, {
            where: { id: req.params.id }
        }).then(dbEmployee => {
            res.json(dbEmployee);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.Employee.create(req.body)
        .then(dbEmployee => {
            res.json(dbEmployee);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
