const router = require("express").Router();
const teamScheduleController = require("../../controllers/teamScheduleController");

router.route("/team/:id")
    .get(teamScheduleController.findAllByTeam);

router.route("/team/:id/:week")
    .get(teamScheduleController.findByTeamWeek);

router.route("/week/:week")
    .get(teamScheduleController.findAllByWeek);

router.route("/")
    .get(teamScheduleController.findAll);

module.exports = router;
