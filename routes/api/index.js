const router = require("express").Router();
const employeeRoutes = require("./employees");
const teamRoutes = require("./teams");

router.use("/employees", employeeRoutes);
router.use("/teams", teamRoutes);

module.exports = router;
