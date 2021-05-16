const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.OfficeNeighborScheduleResult.findAll({
            include: [
                {
                    model: db.OfficeNeighborScheduleResolution
                },
                {
                    model: db.OfficeNeighborScheduleResultDay
                }
            ]
        }).then(dbOfficeNeighborScheduleResultsAll => {
            res.json(dbOfficeNeighborScheduleResultsAll);
        });
    },
    findAllByOfficeNeighborScheduleResolution: function(req, res) {
        db.OfficeNeighborScheduleResult.findAll({
            include: [
                {
                    model: db.OfficeNeighborScheduleResolution
                },
                {
                    model: db.OfficeNeighborScheduleResultDay
                }
            ],
            where: { OfficeNeighborScheduleResolutionId: req.params.id }
        }).then(dbOfficeNeighborScheduleResultsOfOfficeNeighborScheduleResolutionAll => {
            res.json(dbOfficeNeighborScheduleResultsOfOfficeNeighborScheduleResolutionAll);
        });
    }
}
