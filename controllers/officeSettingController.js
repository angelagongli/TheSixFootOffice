const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.OfficeSetting.findAll({
            order: [['weekOf', 'DESC']]
        }).then(dbOfficeSettingsAll => {
            res.json(dbOfficeSettingsAll);
        });
    },
    findByWeek: function(req, res) {
        db.OfficeSetting.findOne({
            where: { weekOf: req.params.week }
        }).then(dbOfficeSettingOfWeek => {
            res.json(dbOfficeSettingOfWeek);
        });
    }
}
