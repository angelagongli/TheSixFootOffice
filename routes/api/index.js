const router = require("express").Router();
const employeeRoutes = require("./employees");
const teamRoutes = require("./teams");
const employeeScheduleRoutes = require("./employeeSchedules");
const teamScheduleRoutes = require("./teamSchedules");
const dayRoutes = require("./days");
const eventRoutes = require("./events");
const recurringEventRoutes = require("./recurringEvents");
const officeSettingRoutes = require("./officeSettings");
const officeNeighborScheduleResolutionRoutes = require("./officeNeighborScheduleResolutions");
const officeNeighborScheduleRequestRoutes = require("./officeNeighborScheduleRequests");
const officeNeighborScheduleRequestDayRoutes = require("./officeNeighborScheduleRequestDays");
const officeNeighborScheduleResultRoutes = require("./officeNeighborScheduleResults");

router.use("/employees", employeeRoutes);
router.use("/teams", teamRoutes);
router.use("/employeeSchedules", employeeScheduleRoutes);
router.use("/teamSchedules", teamScheduleRoutes);
router.use("/days", dayRoutes);
router.use("/events", eventRoutes);
router.use("/recurringEvents", recurringEventRoutes);
router.use("/officeSettings", officeSettingRoutes);
router.use("/officeNeighborScheduleResolutions", officeNeighborScheduleResolutionRoutes);
router.use("/officeNeighborScheduleRequests", officeNeighborScheduleRequestRoutes);
router.use("/officeNeighborScheduleRequestDays", officeNeighborScheduleRequestDayRoutes);
router.use("/officeNeighborScheduleResults", officeNeighborScheduleResultRoutes);

module.exports = router;
