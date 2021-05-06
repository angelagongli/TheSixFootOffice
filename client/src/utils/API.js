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
    }
};
