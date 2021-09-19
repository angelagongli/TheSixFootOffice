import React, { useState, useCallback } from "react";
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField, MaskedTextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import API from "../utils/API";

const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { width: 650 } };
const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};
const maskFormat = {
  '*': /\d/
};

function AddVisitor(props) {
    const [VisitorName, setVisitorName] = useState("");
    const [ChosenEmployeeVisiting, setChosenEmployeeVisiting] = useState();
    const [VisitorEmailAddress, setVisitorEmailAddress] = useState("");
    const [VisitorPhoneNumber, setVisitorPhoneNumber] = useState("");
    const [VisitorRole, setVisitorRole] = useState("");
    const [VisitorReason, setVisitorReason] = useState("");
    const [isFullyVaccinatedAgainstCoronavirus, setIsFullyVaccinatedAgainstCoronavirus] = useState(false);
    const [isImmunocompromised, setIsImmunocompromised] = useState(false);
    const [isSickWithCoronavirus, setIsSickWithCoronavirus] = useState(false);
    const [VisitorAdded, setVisitorAdded] = useState(false);
    const [isNotFullyVaccinatedAgainstCoronavirusChosen, setIsNotFullyVaccinatedAgainstCoronavirusChosen] = useState(false);
    const [isImmunocompromisedChosen, setIsImmunocompromisedChosen] = useState(false);
    const [isSickWithCoronavirusChosen, setIsSickWithCoronavirusChosen] = useState(false);

    const onVisitorNameChange = useCallback(
        (event, newNameValue) => {
            setVisitorName(newNameValue || '');
        },
        [],
    );

    function chooseEmployeeVisiting(employee, employeeChoice) {
        setChosenEmployeeVisiting(employeeChoice.key);
    }

    const onVisitorEmailAddressChange = useCallback(
        (event, newEmailAddressValue) => {
            setVisitorEmailAddress(newEmailAddressValue || '');
        },
        [],
    );

    const onVisitorPhoneNumberChange = useCallback(
        (event, newPhoneNumberValue) => {
            setVisitorPhoneNumber(newPhoneNumberValue || '');
        },
        [],
    );

    const onVisitorRoleChange = useCallback(
        (event, newRoleValue) => {
            setVisitorRole(newRoleValue || '');
        },
        [],
    );

    const onVisitorReason = useCallback(
        (event, newReasonValue) => {
            setVisitorReason(newReasonValue || '');
        },
        [],
    );

    const onChangeIsFullyVaccinatedAgainstCoronavirus = useCallback(
        (ev, checked) => {
            setIsFullyVaccinatedAgainstCoronavirus(!!checked);
        },
        [],
    );

    const onChangeIsImmunocompromised = useCallback(
        (ev, checked) => {
            setIsImmunocompromised(!!checked);
        },
        [],
    );

    const onChangeIsSickWithCoronavirus = useCallback(
        (ev, checked) => {
            setIsSickWithCoronavirus(!!checked);
        },
        [],
    );

    function submitVisitor() {
        if (!isFullyVaccinatedAgainstCoronavirus ||
            isImmunocompromised ||
            isSickWithCoronavirus) {
            setIsNotFullyVaccinatedAgainstCoronavirusChosen(!isFullyVaccinatedAgainstCoronavirus);
            setIsImmunocompromisedChosen(isImmunocompromised);
            setIsSickWithCoronavirusChosen(isSickWithCoronavirus);
        } else {
            API.addVisitor({
                name: VisitorName,
                EmployeeVisitingId: ChosenEmployeeVisiting,
                emailAddress: VisitorEmailAddress,
                phoneNumber: VisitorPhoneNumber,
                role: VisitorRole,
                reasonNecessitatingVisit: VisitorReason,
                isFullyVaccinatedAgainstCoronavirus: isFullyVaccinatedAgainstCoronavirus,
                isImmunocompromised: isImmunocompromised,
                isSickWithCoronavirus: isSickWithCoronavirus
            }).then(res => {
                setVisitorAdded(true);
                console.log("Newly Added Visitor: " + JSON.stringify(res));
                window.setTimeout(() => props.chooseMode(""), 1000);
            }).catch(err => console.log(err));
        }
    }

    return (
        <div>
            <h2>
                Add Your Visitor
            </h2>
            {VisitorAdded ?
            <h5>
                New Visitor Added!
            </h5>
            : ""}
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <TextField
                        label="Visitor's Name"
                        value={VisitorName}
                        onChange={onVisitorNameChange}
                        required />
                    {props.employeesAll.length ?
                    <Dropdown
                        label="Choose the Employee You Are Trying to Visit"
                        selectedKey={ChosenEmployeeVisiting ? ChosenEmployeeVisiting : undefined}
                        onChange={chooseEmployeeVisiting}
                        placeholder="Choose Employee"
                        options={props.employeesAll}
                        required />
                    : ""}
                    <TextField
                        label="Visitor's Email Address"
                        value={VisitorEmailAddress}
                        onChange={onVisitorEmailAddressChange}
                        required />
                    <MaskedTextField
                        label="Visitor's Phone Number"
                        value={VisitorPhoneNumber}
                        onChange={onVisitorPhoneNumberChange}
                        required
                        mask="(***) *** ****"
                        maskFormat={maskFormat}
                        maskChar="_" />
                    <TextField
                        label="Visitor's Role"
                        value={VisitorRole}
                        onChange={onVisitorRoleChange}
                        required />
                    <TextField
                        label="Please explain your reason why you believe your issue/task cannot be handled over phone/Zoom:"
                        value={VisitorReason}
                        onChange={onVisitorReason}
                        multiline rows={2}
                        required />
                </Stack>
                <Stack {...columnProps}>
                    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                        <Checkbox
                            label="Is your visitor fully vaccinated against the coronavirus?"
                            checked={isFullyVaccinatedAgainstCoronavirus}
                            onChange={onChangeIsFullyVaccinatedAgainstCoronavirus}
                            required />
                        {isNotFullyVaccinatedAgainstCoronavirusChosen ?
                        <Label className="red">
                            We advise you not to visit the office before being vaccinated for your own safety
                        </Label>
                        : ""}
                    </Stack>
                    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                        <Checkbox
                            label="Is your visitor immunocompromised?"
                            checked={isImmunocompromised}
                            onChange={onChangeIsImmunocompromised}
                            required />
                        {isImmunocompromisedChosen ?
                        <Label className="red">
                            We advise you not to visit the office if immunocompromised for your own safety
                        </Label>
                        : ""}
                    </Stack>
                    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                        <Checkbox
                            label="Is your visitor sick with the coronavirus?"
                            checked={isSickWithCoronavirus}
                            onChange={onChangeIsSickWithCoronavirus}
                            required />
                        {isSickWithCoronavirusChosen ?
                        <Label className="red">
                            You cannot visit the office when sick with the coronavirus and you should seek help right away
                        </Label>
                        : ""}
                    </Stack>
                    <PrimaryButton
                        text="Submit Visitor"
                        onClick={() => submitVisitor()} />
                </Stack>
            </Stack>
        </div>
    );
}

export default AddVisitor;
