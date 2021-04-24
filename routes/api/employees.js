const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

router.route("/")
    .get(employeeController.findAll)
    .post(employeeController.create);

router.route("/:id")
    .get(employeeController.findAllByTeam)
    .put(employeeController.update);

module.exports = router;
