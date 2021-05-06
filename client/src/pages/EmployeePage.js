import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import EmployeeCard from "../components/EmployeeCard";
import ChosenEmployee from "../components/ChosenEmployee";
import AddEmployee from "../components/AddEmployee";
import UpdateEmployee from "../components/UpdateEmployee";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import API from "../utils/API";

function EmployeePage() {
    const [employeesAll, setEmployeesAll] = useState([]);
    const [teamsAll, setTeamsAll] = useState([]);
    const [chosenEmployee, setChosenEmployee] = useState();
    const [chosenTeam, setChosenTeam] = useState();
    const [mode, setMode] = useState("");
    const [employeeSeatLookUp, setEmployeeSeatLookUp] = useState({});

    useEffect(() => {
        loadEmployeesAll();
        loadTeamsAll();
    }, [mode]);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            setEmployeesAll(res.data);
            console.log("All employees set");
            let employeeSeatLookUp = {};
            for (const employee of res.data) {
                employeeSeatLookUp[employee.seatNumber] = employee.id;
            }
            setEmployeeSeatLookUp(employeeSeatLookUp);
            console.log("All employees in Employee/Seat Lookup set");
        }).catch(err => console.log(err));
    }

    function loadTeamsAll() {
        API.getTeamsAll().then(res => {
            let teamKeyName = [{
                key: "All",
                text: "All Office"
            }];
            for (const team of res.data) {
                teamKeyName.push({
                    key: team.id,
                    text: team.name
                });
            }
            setTeamsAll(teamKeyName);
            console.log("All teams set");
        }).catch(err => console.log(err));
    }

    function chooseEmployee(employeeID) {
        setChosenEmployee(employeeID);
    }

    function chooseTeam(event, teamChoice) {
        setChosenTeam(teamChoice.key);
    }

    function chooseMode(mode) {
        setMode(mode);
    }

    return (
        <div>
            <div className="row g-0">
                <div className="col-12">
                    <Header />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-3 col-sm-2 col-lg-1">
                    <Navigation />
                </div>
                <div className="col-9 col-sm-10 col-lg-11">
                    <div className="row g-0">
                        <div className="col-6 col-lg-4 container">
                            <h2>
                                Employee Section
                            </h2>
                            <PrimaryButton
                                text="Add Employee"
                                onClick={() => chooseMode("Add")} />
                            {teamsAll.length ?
                            <Dropdown
                                label="Restrict Employees to Your Chosen Team"
                                selectedKey={chosenTeam ? chosenTeam.key : undefined}
                                onChange={chooseTeam}
                                placeholder="Choose Your Team"
                                options={teamsAll}
                                styles={{ dropdown: { width: 300 } }} />
                            : ""}
                            {employeesAll.length ?
                            <div className="cardContainer">
                                {chosenTeam && chosenTeam !== "All" ?
                                employeesAll.filter(employee =>
                                employee.TeamId === chosenTeam).map(employee => (
                                    <EmployeeCard
                                        key={employee.id}
                                        employee={employee}
                                        chooseEmployee={chooseEmployee}
                                        chooseMode={chooseMode} />
                                )) : employeesAll.map(employee => (
                                    <EmployeeCard
                                        key={employee.id}
                                        employee={employee}
                                        chooseEmployee={chooseEmployee}
                                        chooseMode={chooseMode} />
                                ))}
                            </div>
                            : ""}
                        </div>
                        <div className="col-6 col-lg-8 container">
                            {mode ?
                            ((mode === "View" && chosenEmployee) ?
                            <ChosenEmployee employee={employeesAll.find(employee =>
                                employee.id === chosenEmployee)} />
                            : ((mode === "Update" && chosenEmployee) ?
                            <UpdateEmployee employee={employeesAll.find(employee =>
                                employee.id === chosenEmployee)}
                                teamsAll={teamsAll.filter(team =>
                                    team.key !== "All")}
                                employeeSeatLookUp={employeeSeatLookUp}
                                chooseMode={chooseMode} />
                            : (mode === "Add" ?
                            <AddEmployee teamsAll={teamsAll.filter(team =>
                                team.key !== "All")}
                                employeeSeatLookUp={employeeSeatLookUp}
                                chooseMode={chooseMode} />
                            : "")))
                            : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeePage;
