const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Visitor.findAll({
            include: {
                model: db.Employee,
                as: "EmployeeVisiting"
            },
            order: [['EmployeeVisitingId']]
        }).then(dbVisitorsAll => {
            res.json(dbVisitorsAll);
        });
    },
    findAllByEmployeeVisiting: function(req, res) {
        db.Visitor.findAll({
            include: {
                model: db.Employee,
                as: "EmployeeVisiting"
            },
            where: { EmployeeVisitingId: req.params.id }
        }).then(dbVisitorsOfEmployeeAll => {
            res.json(dbVisitorsOfEmployeeAll);
        });
    },
    update: function(req, res) {
        db.Visitor.update(req.body, {
            where: { id: req.params.id }
        }).then(dbVisitor => {
            res.json(dbVisitor);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.Visitor.create(req.body)
        .then(dbVisitor => {
            res.json(dbVisitor);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
