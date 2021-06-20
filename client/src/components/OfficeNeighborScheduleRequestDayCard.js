import React, { useState, useEffect } from "react";
import OfficeNeighborScheduleRequestDayPopUp from "./OfficeNeighborScheduleRequestDayPopUp";
import { useBoolean } from '@fluentui/react-hooks';
import { IconButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';

function OfficeNeighborScheduleRequestDayCard(props) {
    const day = props.officeNeighborScheduleRequestDay;
    const [chosenInOfficeRequirementRequestedForDay, setChosenInOfficeRequirementRequestedForDay] = useState(day.inOfficeRequirementRequested);
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
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
        setChosenInOfficeRequirementRequestedForDay(day.inOfficeRequirementRequested);
    }, [day.inOfficeRequirementRequested]);

    function chooseInOfficeRequirementRequestedForDay(event, inOfficeRequirementRequested) {
        setChosenInOfficeRequirementRequestedForDay(inOfficeRequirementRequested.key);
        props.updateInOfficeRequirementRequestedForDay(props.officeNeighborScheduleRequestDay.date, inOfficeRequirementRequested.key);
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
            <div className="officeNeighborScheduleRequestDayCardContainer">
                <Label>
                    From:
                </Label>
                <div className="inOfficeRequirementUpdateContainer">
                    <div className="inOfficeRequirementIcon">
                        <i className={`ms-Icon ms-Icon--${props.inOfficeRequirementRequestedIcon}`} aria-hidden="true"></i>
                    </div>
                    <IconButton
                        onClick={toggleHideDialog}
                        iconProps={{ iconName: "Edit" }} />
                </div>
            </div>
            <div className="officeNeighborScheduleRequestDayCardContainer">
                <Label>
                    To:
                </Label>
                <div className={`inOfficeRequirement ${chosenInOfficeRequirementRequestedForDay.split(" ").join("")}`}>
                    {chosenInOfficeRequirementRequestedForDay}
                </div>
            </div>
            <OfficeNeighborScheduleRequestDayPopUp
                day={day}
                chooseInOfficeRequirementRequestedForDay={chooseInOfficeRequirementRequestedForDay}
                chosenInOfficeRequirementRequestedForDay={chosenInOfficeRequirementRequestedForDay}
                hideDialog={hideDialog}
                toggleHideDialog={toggleHideDialog}
                inOfficeRequirementRequestedChoice={computeInOfficeRequirementRequestedChoice(day.inOfficeRequirementRequested)} />
        </div>
    );
}

export default OfficeNeighborScheduleRequestDayCard;
