const router = require("express").Router();
const visitorController = require("../../controllers/visitorController");

router.route("/")
    .get(visitorController.findAll)
    .post(visitorController.create);

router.route("/:id")
    .get(visitorController.findAllByEmployeeVisiting)
    .put(visitorController.update);

module.exports = router;
