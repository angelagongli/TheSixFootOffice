import React from "react";

function DayCard(props) {
    return (
        <div className="dayCard ms-depth-4">
            <h5>
                {props.heading}
            </h5>
            <div className={`inOfficeRequirement ${props.inOfficeRequirement.split(" ").join("")}`}>
                {props.inOfficeRequirement}
            </div>
        </div>
    );
}

export default DayCard;
