const router = require("express").Router();
const teamController = require("../../controllers/teamController");

router.route("/")
    .get(teamController.findAll)
    .post(teamController.create);

router.route("/:id")
    .put(teamController.update);

module.exports = router;
