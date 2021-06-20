import React, { useState } from "react";
import DayCard from "./DayCard";
import OfficeNeighborScheduleRequestDayCard from "./OfficeNeighborScheduleRequestDayCard";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

function OfficeNeighborScheduleRequestWeek(props) {
    const [inOfficeRequirementRequestedForDayAll, setChosenInOfficeRequirementRequestedForDayAll] = useState({});
    const req = props.officeNeighborScheduleRequest;
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

    function updateInOfficeRequirementRequestedForDay(date, updatedInOfficeRequirementRequested) {
        let presentInOfficeRequirementRequested = req.OfficeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay =>
            officeNeighborScheduleRequestDay.date === date).inOfficeRequirement;
        if (presentInOfficeRequirementRequested !== updatedInOfficeRequirementRequested) {
            let inOfficeRequirementRequestedObject = inOfficeRequirementRequestedForDayAll;
            inOfficeRequirementRequestedObject[date] = updatedInOfficeRequirementRequested;
            setChosenInOfficeRequirementRequestedForDayAll(inOfficeRequirementRequestedObject);
        }
    }

    function updateOfficeNeighborScheduleRequestForWeek() {
        if (Object.entries(inOfficeRequirementRequestedForDayAll).length) {
            const officeNeighborScheduleRequestNewPhase = req.officeNeighborScheduleRequestPhase === "Generated" ?
                "Submitted" : "Re-Submitted";
            API.makeOfficeNeighborScheduleRequest({
                officeNeighborScheduleRequestPhase: officeNeighborScheduleRequestNewPhase,
                nearestOfficeNeighborRole: req.nearestOfficeNeighborRole,
                OfficeNeighborScheduleResolutionId: req.OfficeNeighborScheduleResolutionId
            }).then(res => {
                console.log("Newly Created Office Neighbor Schedule Request: " + JSON.stringify(res));
                for (const day of req.OfficeNeighborScheduleRequestDays) {
                    API.makeOfficeNeighborScheduleRequestDay({
                        date: day.date,
                        inOfficeRequirementRequested: inOfficeRequirementRequestedForDayAll[day.date] ?
                            inOfficeRequirementRequestedForDayAll[day.date] : day.inOfficeRequirementRequested,
                        OfficeNeighborScheduleRequestId: res.data.id
                    }).then(res => {
                        console.log("Newly Created Office Neighbor Schedule Request Day: " + JSON.stringify(res));
                    }).catch(err => console.log(err));
                }
                props.setOfficeNeighborScheduleRequestUpdated(true);
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="container">
            <h5>
                {props.employee.name}: {req.officeNeighborScheduleRequestPhase === "Generated" ?
                "Not Yet Submitted" : req.officeNeighborScheduleRequestPhase}
            </h5>
            <div className="dayCardContainer">
                {props.employeeScheduleDays.map(day => (
                    req.OfficeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay => officeNeighborScheduleRequestDay.date === day.date) ?
                    <OfficeNeighborScheduleRequestDayCard
                        key={day.id}
                        heading={`${computeDayOfWeek(day.date)},
                            ${formatDate(day.date)}`}
                        officeNeighborScheduleRequestDay={req.OfficeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay =>
                            officeNeighborScheduleRequestDay.date === day.date)}
                        inOfficeRequirementRequestedIcon={inOfficeRequirementIconLookUp[req.OfficeNeighborScheduleRequestDays.find(officeNeighborScheduleRequestDay =>
                            officeNeighborScheduleRequestDay.date === day.date).inOfficeRequirementRequested]}
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
