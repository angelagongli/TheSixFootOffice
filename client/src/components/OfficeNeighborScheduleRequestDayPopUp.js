import React from "react";
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';

function OfficeNeighborScheduleRequestDayPopUp(props) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dialogContentProps = {
        type: DialogType.normal,
        title: "Request Your In Office Requirement for the Day",
        closeButtonAriaLabel: 'Close',
        subText: `Your present In Office Requirement requested on ${computeDayOfWeek(props.day.date)}, ${formatDate(props.day.date)} is ${props.day.inOfficeRequirementRequested}.`,
    };

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
        <Dialog
            hidden={props.hideDialog}
            onDismiss={props.toggleHideDialog}
            dialogContentProps={dialogContentProps} >
            <Dropdown
                label="Request Your In Office Requirement for the Day"
                selectedKey={props.chosenInOfficeRequirementRequestedForDay ? props.chosenInOfficeRequirementRequestedForDay : undefined}
                onChange={props.chooseInOfficeRequirementRequestedForDay}
                placeholder={props.day.inOfficeRequirementRequested}
                options={props.inOfficeRequirementRequestedChoice} />
            <DialogFooter>
                <PrimaryButton onClick={props.toggleHideDialog} text="Done" />
            </DialogFooter>
        </Dialog>
    );
}

export default OfficeNeighborScheduleRequestDayPopUp;
