const router = require("express").Router();
const officeSettingController = require("../../controllers/officeSettingController");

router.route("/week/:week")
    .get(officeSettingController.findByWeek);

router.route("/")
    .get(officeSettingController.findAll);

module.exports = router;
