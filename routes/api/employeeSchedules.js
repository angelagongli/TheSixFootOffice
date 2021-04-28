const router = require("express").Router();
const employeeScheduleController = require("../../controllers/employeeScheduleController");

router.route("/employee/:id")
    .get(employeeScheduleController.findAllByEmployee);

router.route("/employee/:id/:week")
    .get(employeeScheduleController.findByEmployeeWeek);

router.route("/team/:id")
    .get(employeeScheduleController.findAllByTeam);

router.route("/team/:id/:week")
    .get(employeeScheduleController.findAllByTeamWeek);

router.route("/week/:week")
    .get(employeeScheduleController.findAllByWeek);

router.route("/")
    .get(employeeScheduleController.findAll);

module.exports = router;
