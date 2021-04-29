import React, { useState, useEffect } from "react";
import EmployeeSchedule from "./EmployeeSchedule";
import API from "../utils/API";

function ChosenEmployee(props) {
    const [employeeSchedule, setEmployeeSchedule] = useState();
    const today = new Date();
    const beginningOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    useEffect(() => {
        loadEmployeeSchedule();
    }, [props.employee]);

    function loadEmployeeSchedule() {
        API.getEmployeeScheduleByEmployeeWeek(props.employee.id,
            `${beginningOfWeek.getFullYear()}-${beginningOfWeek.getMonth() + 1}-${beginningOfWeek.getDate() + 1}`)
            .then(res => {
                setEmployeeSchedule(res.data);
                console.log("Employee's schedule set");
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                {props.employee.name}'s Schedule for the Week
            </h2>
            {employeeSchedule && employeeSchedule.Days.length ?
            <EmployeeSchedule days={employeeSchedule.Days} />
            : ""}
        </div>
    );
}

export default ChosenEmployee;
