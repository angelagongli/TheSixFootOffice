import React from "react";

function DayCard(props) {
    return (
        <div className="dayCard ms-depth-4">
            <h5>
                {props.heading}
            </h5>
            <div className="inOfficeRequirementIcon">
                <i className={`ms-Icon ms-Icon--${props.inOfficeRequirementIcon}`} aria-hidden="true"></i>
            </div>
            <div className={`inOfficeRequirement ${props.inOfficeRequirement.split(" ").join("")}`}>
                {props.inOfficeRequirement}
            </div>
        </div>
    );
}

export default DayCard;
