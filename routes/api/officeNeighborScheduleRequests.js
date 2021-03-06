const router = require("express").Router();
const officeNeighborScheduleRequestController = require("../../controllers/officeNeighborScheduleRequestController");

router.route("/officeNeighborScheduleResolution/:id")
    .get(officeNeighborScheduleRequestController.findAllByOfficeNeighborScheduleResolution);

router.route("/")
    .get(officeNeighborScheduleRequestController.findAll)
    .post(officeNeighborScheduleRequestController.create);

router.route("/:id")
    .put(officeNeighborScheduleRequestController.update);

module.exports = router;
