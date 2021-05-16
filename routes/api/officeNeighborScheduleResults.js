const router = require("express").Router();
const officeNeighborScheduleResultController = require("../../controllers/officeNeighborScheduleResultController");

router.route("/officeNeighborScheduleResolution/:id")
    .get(officeNeighborScheduleResultController.findAllByOfficeNeighborScheduleResolution);

router.route("/")
    .get(officeNeighborScheduleResultController.findAll);

module.exports = router;
