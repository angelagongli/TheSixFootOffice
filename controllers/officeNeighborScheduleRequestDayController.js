const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.OfficeNeighborScheduleRequestDay.findAll({
            include: [
                {
                    model: db.OfficeNeighborScheduleRequest
                }
            ]
        }).then(dbOfficeNeighborScheduleRequestDaysAll => {
            res.json(dbOfficeNeighborScheduleRequestDaysAll);
        });
    },
    findAllByOfficeNeighborScheduleRequest: function(req, res) {
        db.OfficeNeighborScheduleRequestDay.findAll({
            include: [
                {
                    model: db.OfficeNeighborScheduleRequest
                }
            ],
            where: { OfficeNeighborScheduleRequestId: req.params.id }
        }).then(dbOfficeNeighborScheduleRequestDaysOfOfficeNeighborScheduleRequestAll => {
            res.json(dbOfficeNeighborScheduleRequestDaysOfOfficeNeighborScheduleRequestAll);
        });
    },
    update: function(req, res) {
        db.OfficeNeighborScheduleRequestDay.update(req.body, {
            where: { id: req.params.id }
        }).then(dbOfficeNeighborScheduleRequestDay => {
            res.json(dbOfficeNeighborScheduleRequestDay);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.OfficeNeighborScheduleRequestDay.create(req.body)
        .then(dbOfficeNeighborScheduleRequestDay => {
            res.json(dbOfficeNeighborScheduleRequestDay);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
