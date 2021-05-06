import React from "react";
import EventCard from "./EventCard";

function TeamSchedule(props) {
    return (
        <div className="cardContainer eventCardContainer">
            {props.events.map(event => (
                <EventCard
                    key={event.id}
                    event={event} />
            ))}
        </div>
    );
}

export default TeamSchedule;
