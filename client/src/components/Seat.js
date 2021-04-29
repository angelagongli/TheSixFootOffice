import React, { useState, useEffect } from "react";
import { Persona, PersonaInitialsColor, PersonaSize } from '@fluentui/react/lib/Persona';
import API from "../utils/API";
import EmployeeSchedule from "./EmployeeSchedule";

function Seat(props) {
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
            <h5>
                Seat Number: {props.employee.seatNumber}
            </h5>
            <Persona text={props.employee.name}
                secondaryText={`Employee ID: ${props.employee.id},
                    Employee's Team: ${props.employee.Team.name}`}
                showSecondaryText={true}
                size={PersonaSize.size32}
                initialsColor={PersonaInitialsColor.cyan} />
            {employeeSchedule && employeeSchedule.Days.length ?
            <EmployeeSchedule days={employeeSchedule.Days} />
            : ""}
        </div>
    );
}

export default Seat;
