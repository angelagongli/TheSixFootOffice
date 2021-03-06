import axios from "axios";

export default {
    getEmployeesAll: function() {
        return axios.get("/api/employees");
    },
    getEmployeesAllByTeam: function(id) {
        return axios.get("/api/employees/" + id);
    },
    updateEmployee: function(id, update) {
        return axios.put("/api/employees/" + id, update);
    },
    addEmployee: function(employee) {
        return axios.post("/api/employees", employee);
    },
    getTeamsAll: function() {
        return axios.get("/api/teams");
    },
    updateTeam: function(id, update) {
        return axios.put("/api/teams/" + id, update);
    },
    makeTeam: function(team) {
        return axios.post("/api/teams", team);
    },
    getEmployeeSchedulesAll: function() {
        return axios.get("/api/employeeSchedules");
    },
    getEmployeeSchedulesAllByEmployee: function(id) {
        return axios.get("/api/employeeSchedules/employee/" + id);
    },
    getEmployeeScheduleByEmployeeWeek: function(id, week) {
        return axios.get(`/api/employeeSchedules/employee/${id}/${week}`);
    },
    getEmployeeSchedulesAllByTeam: function(id) {
        return axios.get("/api/employeeSchedules/team/" + id);
    },
    getEmployeeSchedulesAllByTeamWeek: function(id, week) {
        return axios.get(`/api/employeeSchedules/team/${id}/${week}`);
    },
    getEmployeeSchedulesAllByWeek: function(week) {
        return axios.get("/api/employeeSchedules/week/" + week);
    },
    getDaysAllByDate: function(date) {
        return axios.get("/api/days/date/" + date);
    },
    getTeamSchedulesAll: function() {
        return axios.get("/api/teamSchedules");
    },
    getTeamSchedulesAllByTeam: function(id) {
        return axios.get("/api/teamSchedules/team/" + id);
    },
    getTeamScheduleByTeamWeek: function(id, week) {
        return axios.get(`/api/teamSchedules/team/${id}/${week}`);
    },
    getTeamSchedulesAllByWeek: function(week) {
        return axios.get("/api/teamSchedules/week/" + week);
    },
    getEventsAll: function() {
        return axios.get("/api/events");
    },
    getEventsAllByDate: function(date) {
        return axios.get("/api/events/date/" + date);
    },
    getUpcomingEventsAllFollowingDate: function(date) {
        return axios.get("/api/events/date/following/" + date);
    },
    updateEvent: function(id, update) {
        return axios.put("/api/events/" + id, update);
    },
    makeEvent: function(event) {
        return axios.post("/api/events", event);
    },
    getRecurringEventsAll: function() {
        return axios.get("/api/recurringEvents");
    },
    getRecurringEventsAllByTeam: function(id) {
        return axios.get("/api/recurringEvents/team/" + id);
    },
    updateRecurringEvent: function(id, update) {
        return axios.put("/api/recurringEvents/" + id, update);
    },
    makeRecurringEvent: function(recurringEvent) {
        return axios.post("/api/recurringEvents", recurringEvent);
    },
    getOfficeSettingsAll: function() {
        return axios.get("/api/officeSettings");
    },
    getOfficeSettingByWeek: function(week) {
        return axios.get("/api/officeSettings/week/" + week);
    },
    getOfficeNeighborScheduleResolutionsAll: function() {
        return axios.get("/api/officeNeighborScheduleResolutions");
    },
    getOfficeNeighborScheduleResolutionByID: function(id) {
        return axios.get("/api/officeNeighborScheduleResolutions/" + id);
    },
    getOfficeNeighborScheduleResolutionsAllByEmployee: function(id) {
        return axios.get("/api/officeNeighborScheduleResolutions/employee/" + id);
    },
    getOfficeNeighborScheduleResolutionByEmployeeWeek: function(id, week) {
        return axios.get(`/api/officeNeighborScheduleResolutions/employee/${id}/${week}`);
    },
    getOfficeNeighborScheduleResolutionsAllByWeek: function(week) {
        return axios.get("/api/officeNeighborScheduleResolutions/week/" + week);
    },
    updateOfficeNeighborScheduleResolution: function(id, update) {
        return axios.put("/api/officeNeighborScheduleResolutions/" + id, update);
    },
    getOfficeNeighborScheduleRequestsAll: function() {
        return axios.get("/api/officeNeighborScheduleRequests");
    },
    getOfficeNeighborScheduleRequestsAllByOfficeNeighborScheduleResolution: function(id) {
        return axios.get("/api/officeNeighborScheduleRequests/officeNeighborScheduleResolution/" + id);
    },
    updateOfficeNeighborScheduleRequest: function(id, update) {
        return axios.put("/api/officeNeighborScheduleRequests/" + id, update);
    },
    makeOfficeNeighborScheduleRequest: function(officeNeighborScheduleRequest) {
        return axios.post("/api/officeNeighborScheduleRequests", officeNeighborScheduleRequest);
    },
    getOfficeNeighborScheduleRequestDaysAll: function() {
        return axios.get("/api/officeNeighborScheduleRequestDays");
    },
    getOfficeNeighborScheduleRequestDaysAllByOfficeNeighborScheduleRequest: function(id) {
        return axios.get("/api/officeNeighborScheduleRequestDays/officeNeighborScheduleRequest/" + id);
    },
    updateOfficeNeighborScheduleRequestDay: function(id, update) {
        return axios.put("/api/officeNeighborScheduleRequestDays/" + id, update);
    },
    makeOfficeNeighborScheduleRequestDay: function(officeNeighborScheduleRequestDay) {
        return axios.post("/api/officeNeighborScheduleRequestDays", officeNeighborScheduleRequestDay);
    },
    getVisitorsAll: function() {
        return axios.get("/api/visitors");
    },
    getVisitorsAllByEmployeeVisiting: function(id) {
        return axios.get("/api/visitors/" + id);
    },
    updateVisitor: function(id, update) {
        return axios.put("/api/visitors/" + id, update);
    },
    addVisitor: function(visitor) {
        return axios.post("/api/visitors", visitor);
    }
};
