const router = require("express").Router();
const officeNeighborScheduleRequestDayController = require("../../controllers/officeNeighborScheduleRequestDayController");

router.route("/officeNeighborScheduleRequest/:id")
    .get(officeNeighborScheduleRequestDayController.findAllByOfficeNeighborScheduleRequest);

router.route("/")
    .get(officeNeighborScheduleRequestDayController.findAll);

router.route("/:id")
    .put(officeNeighborScheduleRequestDayController.update);

module.exports = router;
