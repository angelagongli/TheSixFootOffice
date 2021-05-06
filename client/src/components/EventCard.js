import React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';

function EventCard(props) {
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

    function formatTime(timeString) {
        const [hour, minute, second] = timeString.split(":");
        return `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${Math.floor(hour/12) < 1 ? "AM" : "PM"}`;
    }

    function handleChoice() {
        props.chooseEvent(props.event.id);
        props.chooseMode("Update");
    }

    return (
        <div className="eventCard ms-depth-4">
            <h5>
                {props.view === "All Office" ?
                `${props.teamName} Team's ${props.event.name}` :
                `${props.event.name} on ${computeDayOfWeek(props.event.date)}`}
            </h5>
            <div className="timebox">
                <i className="timeIcon ms-Icon ms-Icon--Clock" aria-hidden="true"></i>
                <div className="detailedTime">
                    {computeDayOfWeek(props.event.date)}, {formatDate(props.event.date)}<br />
                    {formatTime(props.event.startTime)}-{formatTime(props.event.endTime)}
                </div>
            </div>
            <p>
                {props.event.description}
            </p>
            {props.enableUpdate ?
            <PrimaryButton
                text={`Update ${props.event.name} Event Information`}
                onClick={() => handleChoice()} />
            : ""}
        </div>
    );
}

export default EventCard;
