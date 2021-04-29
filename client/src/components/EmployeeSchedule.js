import React from "react";
import DayCard from "./DayCard";

function EmployeeSchedule(props) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function computeDayOfWeek(dateString) {
        const [year, month, date] = dateString.split("-");
        const parsedDate = new Date(year, month - 1, date);
        return daysOfWeek[parsedDate.getDay()];
    }

    function formatDate(dateString) {
        const [year, month, date] = dateString.split("-");
        return `${month}/${date}/${year}`;
    }

    return (
        <div className="dayCardContainer">
            {props.days.map(day => (
                <DayCard
                    key={day.id}
                    heading={`${computeDayOfWeek(day.date)}, 
                        ${formatDate(day.date)}`}
                    inOfficeRequirement={day.inOfficeRequirement} />
            ))}
        </div>
    );
}

export default EmployeeSchedule;
