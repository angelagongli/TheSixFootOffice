const router = require("express").Router();
const recurringEventController = require("../../controllers/recurringEventController");

router.route("/team/:id")
    .get(recurringEventController.findAllByTeam);

router.route("/")
    .get(recurringEventController.findAll)
    .post(recurringEventController.create);

router.route("/:id")
    .put(recurringEventController.update);

module.exports = router;
