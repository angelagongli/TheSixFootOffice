const router = require("express").Router();
const officeNeighborScheduleResolutionController = require("../../controllers/officeNeighborScheduleResolutionController");

router.route("/employee/:id")
    .get(officeNeighborScheduleResolutionController.findAllByEmployee);

router.route("/employee/:id/:week")
    .get(officeNeighborScheduleResolutionController.findByEmployeeWeek);

router.route("/week/:week")
    .get(officeNeighborScheduleResolutionController.findAllByWeek);

router.route("/")
    .get(officeNeighborScheduleResolutionController.findAll);

router.route("/:id")
    .get(officeNeighborScheduleResolutionController.findByID)
    .put(officeNeighborScheduleResolutionController.update);

module.exports = router;
