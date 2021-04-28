const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/teamSchedule/:id")
    .get(eventController.findAllByTeamSchedule);

router.route("/date/:date")
    .get(eventController.findAllByDate);

router.route("/")
    .get(eventController.findAll);

module.exports = router;
