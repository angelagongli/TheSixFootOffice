const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/teamSchedule/:id")
    .get(eventController.findAllByTeamSchedule);

router.route("/date/:date")
    .get(eventController.findAllByDate);

router.route("/date/following/:date")
    .get(eventController.findAllUpcomingFollowingDate);

router.route("/")
    .get(eventController.findAll)
    .post(eventController.create);

router.route("/:id")
    .put(eventController.update);

module.exports = router;
