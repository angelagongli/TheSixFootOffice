const router = require("express").Router();
const dayController = require("../../controllers/dayController");

router.route("/employeeSchedule/:id")
    .get(dayController.findAllByEmployeeSchedule);

router.route("/date/:date")
    .get(dayController.findAllByDate);

router.route("/")
    .get(dayController.findAll);

module.exports = router;
