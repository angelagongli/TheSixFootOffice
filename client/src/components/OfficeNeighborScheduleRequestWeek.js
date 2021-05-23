import React, { useState } from "react";
import DayCard from "./DayCard";
import OfficeNeighborScheduleRequestDayCard from "./OfficeNeighborScheduleRequestDayCard";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

function OfficeNeighborScheduleRequestWeek(props) {
    const [inOfficeRequirementRequestedForDayAll, setChosenInOfficeRequirementRequestedForDayAll] = useState({});
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

    function updateInOfficeRequirementRequestedForDay(officeNeighborScheduleRequestDayID, updatedInOfficeRequirementRequested) {
        let inOfficeRequirementRequestedObject = inOfficeRequirementRequestedForDayAll;
        inOfficeRequirementRequestedObject[officeNeighborScheduleRequestDayID] = updatedInOfficeRequirementRequested;
        setChosenInOfficeRequirementRequestedForDayAll(inOfficeRequirementRequestedObject);
    }

    function updateOfficeNeighborScheduleRequestForWeek() {
        if (Object.entries(inOfficeRequirementRequestedForDayAll).length) {
            for (const inOfficeRequirementRequestedDayID in inOfficeRequirementRequestedForDayAll) {
                API.updateOfficeNeighborScheduleRequestDay(inOfficeRequirementRequestedDayID, {
                    inOfficeRequirementRequested: inOfficeRequirementRequestedForDayAll[inOfficeRequirementRequestedDayID]
                }).then(res => {
                    console.log("Newly Updated Office Neighbor Schedule Request Day: " + JSON.stringify(res));
                }).catch(err => console.log(err));
            }
            const officeNeighborScheduleRequestNewPhase = props.officeNeighborScheduleRequestPhase === "Generated" ?
                "Submitted" : "Re-Submitted";
            API.updateOfficeNeighborScheduleRequest(props.officeNeighborScheduleRequestID, {
                officeNeighborScheduleRequestPhase: officeNeighborScheduleRequestNewPhase
            }).then(res => {
                console.log("Newly Updated Office Neighbor Schedule Request: " + JSON.stringify(res));
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="container">
            <h5>
                {props.employee.name}: {props.officeNeighborScheduleRequestPhase === "Generated" ?
                "Not Yet Submitted" : props.officeNeighborScheduleRequestPhase}
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
                            officeNeighborScheduleRequestDay.date === day.date).inOfficeRequirementRequested}
                        updateInOfficeRequirementRequestedForDay={updateInOfficeRequirementRequestedForDay} />
                    : <DayCard
                        key={day.id}
                        heading={`${computeDayOfWeek(day.date)},
                            ${formatDate(day.date)}`}
                        inOfficeRequirementIcon={inOfficeRequirementIconLookUp[day.inOfficeRequirement]}
                        inOfficeRequirement={day.inOfficeRequirement} />
                ))}
            </div>
            <PrimaryButton
                text={"Update Your In Office Requirement Requested for the Week"}
                onClick={() => updateOfficeNeighborScheduleRequestForWeek()} />
        </div>
    );
}

export default OfficeNeighborScheduleRequestWeek;
