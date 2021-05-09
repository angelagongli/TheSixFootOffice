const router = require("express").Router();
const employeeRoutes = require("./employees");
const teamRoutes = require("./teams");
const employeeScheduleRoutes = require("./employeeSchedules");
const teamScheduleRoutes = require("./teamSchedules");
const dayRoutes = require("./days");
const eventRoutes = require("./events");
const recurringEventRoutes = require("./recurringEvents");

router.use("/employees", employeeRoutes);
router.use("/teams", teamRoutes);
router.use("/employeeSchedules", employeeScheduleRoutes);
router.use("/teamSchedules", teamScheduleRoutes);
router.use("/days", dayRoutes);
router.use("/events", eventRoutes);
router.use("/recurringEvents", recurringEventRoutes);

module.exports = router;
