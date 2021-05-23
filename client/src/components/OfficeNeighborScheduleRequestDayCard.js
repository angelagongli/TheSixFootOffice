import React, { useState, useEffect } from "react";
import { Dropdown } from '@fluentui/react/lib/Dropdown';

function OfficeNeighborScheduleRequestDayCard(props) {
    const [ chosenInOfficeRequirementRequestedForDay, setChosenInOfficeRequirementRequestedForDay] = useState(props.inOfficeRequirementRequested);
    const inOfficeRequirementRequestedChoice = [
        {
            key: "In Office All Day",
            text: "In Office All Day"
        },
        {
            key: "In Office AM",
            text: "In Office AM"
        },
        {
            key: "In Office PM",
            text: "In Office PM"
        },
        {
            key: "Home",
            text: "Home"
        }
    ];

    useEffect(() => {
        setChosenInOfficeRequirementRequestedForDay(props.inOfficeRequirementRequested);
    }, [props.inOfficeRequirementRequested]);

    function chooseInOfficeRequirementRequestedForDay(event, inOfficeRequirementRequested) {
        setChosenInOfficeRequirementRequestedForDay(inOfficeRequirementRequested.key);
        props.updateInOfficeRequirementRequestedForDay(props.officeNeighborScheduleRequestDayID, inOfficeRequirementRequested.key);
    }

    function computeInOfficeRequirementRequestedChoice(inOfficeRequirementRequested) {
        let presentInOfficeRequirementRequestedIndex = inOfficeRequirementRequestedChoice.findIndex(requirement =>
            requirement.key === inOfficeRequirementRequested);
        inOfficeRequirementRequestedChoice[presentInOfficeRequirementRequestedIndex] = {
            key: inOfficeRequirementRequested,
            text: "Present In Office Requirement Requested: " + inOfficeRequirementRequested
        }
        return inOfficeRequirementRequestedChoice;
    }

    return (
        <div className="dayCard officeNeighborScheduleRequestDayCard ms-depth-4">
            <h5>
                {props.heading}
            </h5>
            <div className="inOfficeRequirementIcon">
                <i className={`ms-Icon ms-Icon--${props.inOfficeRequirementRequestedIcon}`} aria-hidden="true"></i>
            </div>
            <div className={`inOfficeRequirement ${props.inOfficeRequirementRequested.split(" ").join("")}`}>
                Present In Office Requirement Requested: {props.inOfficeRequirementRequested}
            </div>
            <Dropdown
                label="Request Your In Office Requirement for the Day"
                selectedKey={chosenInOfficeRequirementRequestedForDay ? chosenInOfficeRequirementRequestedForDay : undefined}
                onChange={chooseInOfficeRequirementRequestedForDay}
                placeholder={props.inOfficeRequirementRequested}
                options={computeInOfficeRequirementRequestedChoice(props.inOfficeRequirementRequested)} />
        </div>
    );
}

export default OfficeNeighborScheduleRequestDayCard;
