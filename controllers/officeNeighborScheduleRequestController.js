const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.OfficeNeighborScheduleRequest.findAll({
            include: [
                {
                    model: db.OfficeNeighborScheduleResolution
                },
                {
                    model: db.OfficeNeighborScheduleRequestDay
                }
            ],
            order: [['createdAt', 'DESC'], ['nearestOfficeNeighborRole']]
        }).then(dbOfficeNeighborScheduleRequestsAll => {
            res.json(dbOfficeNeighborScheduleRequestsAll);
        });
    },
    findAllByOfficeNeighborScheduleResolution: function(req, res) {
        db.OfficeNeighborScheduleRequest.findAll({
            include: [
                {
                    model: db.OfficeNeighborScheduleResolution
                },
                {
                    model: db.OfficeNeighborScheduleRequestDay
                }
            ],
            where: { OfficeNeighborScheduleResolutionId: req.params.id },
            order: [['createdAt', 'DESC'], ['nearestOfficeNeighborRole']]
        }).then(dbOfficeNeighborScheduleRequestsOfOfficeNeighborScheduleResolutionAll => {
            res.json(dbOfficeNeighborScheduleRequestsOfOfficeNeighborScheduleResolutionAll);
        });
    },
    update: function(req, res) {
        db.OfficeNeighborScheduleRequest.update(req.body, {
            where: { id: req.params.id }
        }).then(dbOfficeNeighborScheduleRequest => {
            res.json(dbOfficeNeighborScheduleRequest);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    create: function(req, res) {
        db.OfficeNeighborScheduleRequest.create(req.body)
        .then(dbOfficeNeighborScheduleRequest => {
            res.json(dbOfficeNeighborScheduleRequest);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
