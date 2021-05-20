import React from "react";
import DayCard from "./DayCard";
import OfficeNeighborScheduleRequestDayCard from "./OfficeNeighborScheduleRequestDayCard";

function OfficeNeighborScheduleRequestWeek(props) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const inOfficeRequirementIconLookUp = {
        "In Office All Day": "BufferTimeBoth",
        "In Office AM": "BufferTimeBefore",
        "In Office PM": "BufferTimeAfter",
        "Home": "Home",
        "Day Off": "OutOfOffice"
    }

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
        <div className="container">
            <h5>
                {props.employee.name}
            </h5>
            <div className="dayCardContainer">
                {props.employeeScheduleDays.map(day => (
                    props.officeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay => officeNeighborScheduleRequestDay.date === day.date) ?
                    <OfficeNeighborScheduleRequestDayCard
                        key={day.id}
                        heading={`${computeDayOfWeek(day.date)},
                            ${formatDate(day.date)}`}
                        officeNeighborScheduleRequestDayID={props.officeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay =>
                            officeNeighborScheduleRequestDay.date === day.date).id}
                        inOfficeRequirementRequestedIcon={inOfficeRequirementIconLookUp[props.officeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay =>
                            officeNeighborScheduleRequestDay.date === day.date).inOfficeRequirementRequested]}
                        inOfficeRequirementRequested={props.officeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay =>
                            officeNeighborScheduleRequestDay.date === day.date).inOfficeRequirementRequested} />
                    : <DayCard
                        key={day.id}
                        heading={`${computeDayOfWeek(day.date)},
                            ${formatDate(day.date)}`}
                        inOfficeRequirementIcon={inOfficeRequirementIconLookUp[day.inOfficeRequirement]}
                        inOfficeRequirement={day.inOfficeRequirement} />
                ))}
            </div>
        </div>
    );
}

export default OfficeNeighborScheduleRequestWeek;