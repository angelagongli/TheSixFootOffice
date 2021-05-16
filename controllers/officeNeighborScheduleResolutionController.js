const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
    findAll: function(req, res) {
        db.OfficeNeighborScheduleResolution.findAll({
            include: [
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborA"
                },
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborB"
                },
                {
                    model: db.OfficeNeighborScheduleRequest
                },
                {
                    model: db.OfficeNeighborScheduleResult
                }
            ],
            order: [['weekOf', 'DESC']]
        }).then(dbOfficeNeighborScheduleResolutionsAll => {
            res.json(dbOfficeNeighborScheduleResolutionsAll);
        });
    },
    findAllByEmployee: function(req, res) {
        db.OfficeNeighborScheduleResolution.findAll({
            include: [
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborA"
                },
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborB"
                },
                {
                    model: db.OfficeNeighborScheduleRequest
                },
                {
                    model: db.OfficeNeighborScheduleResult
                }
            ],
            where: { 
                [Op.or]: [
                    {
                        NearestOfficeNeighborAId: req.params.id
                    },
                    {
                        NearestOfficeNeighborBId: req.params.id
                    },
                ]
            },
            order: [['weekOf', 'DESC']]
        }).then(dbOfficeNeighborScheduleResolutionsOfEmployeeAll => {
            res.json(dbOfficeNeighborScheduleResolutionsOfEmployeeAll);
        });
    },
    findByEmployeeWeek: function(req, res) {
        db.OfficeNeighborScheduleResolution.findOne({
            include: [
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborA"
                },
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborB"
                },
                {
                    model: db.OfficeNeighborScheduleRequest
                },
                {
                    model: db.OfficeNeighborScheduleResult
                }
            ],
            where: { 
                [Op.or]: [
                    {
                        NearestOfficeNeighborAId: req.params.id
                    },
                    {
                        NearestOfficeNeighborBId: req.params.id
                    },
                ],
                weekOf: req.params.week
            }
        }).then(dbOfficeNeighborScheduleResolutionOfEmployeeWeek => {
            res.json(dbOfficeNeighborScheduleResolutionOfEmployeeWeek);
        });
    },
    findAllByWeek: function(req, res) {
        db.OfficeNeighborScheduleResolution.findAll({
            include: [
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborA"
                },
                {
                    model: db.Employee,
                    as: "NearestOfficeNeighborB"
                },
                {
                    model: db.OfficeNeighborScheduleRequest
                },
                {
                    model: db.OfficeNeighborScheduleResult
                }
            ],
            where: { weekOf: req.params.week }
        }).then(dbOfficeNeighborScheduleResolutionsInWeekAll => {
            res.json(dbOfficeNeighborScheduleResolutionsInWeekAll);
        });
    },
    update: function(req, res) {
        db.OfficeNeighborScheduleResolution.update(req.body, {
            where: { id: req.params.id }
        }).then(dbOfficeNeighborScheduleResolution => {
            res.json(dbOfficeNeighborScheduleResolution);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
}
