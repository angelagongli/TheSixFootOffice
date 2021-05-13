import React, { useState, useEffect, useCallback } from "react";
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

const stackTokens = { childrenGap: 50 };
const stackStyles = { root: { width: 650 } };
const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

function UpdateEmployee(props) {
    const [chosenEmployeeName, setChosenEmployeeName] = useState(props.employee.name);
    const [chosenEmployeeEmailAddress, setChosenEmployeeEmailAddress] = useState(props.employee.emailAddress);
    const [chosenTeam, setChosenTeam] = useState(props.employee.TeamId);
    const [chosenSeat, setChosenSeat] = useState(props.employee.seatNumber);
    const [isFullyVaccinatedAgainstCoronavirus, setIsFullyVaccinatedAgainstCoronavirus] = useState(props.employee.isFullyVaccinatedAgainstCoronavirus);
    const [isWorkingNineEightySchedule, setIsWorkingNineEightySchedule] = useState(props.employee.isWorkingNineEightySchedule);
    const [isImmunocompromised, setIsImmunocompromised] = useState(props.employee.isImmunocompromised);
    const [isSickWithCoronavirus, setIsSickWithCoronavirus] = useState(props.employee.isSickWithCoronavirus);
    const [chosenEmployeeUpdated, setChosenEmployeeUpdated] = useState(false);

    useEffect(() => {
        setChosenEmployeeName(props.employee.name);
        setChosenEmployeeEmailAddress(props.employee.emailAddress);
        setChosenTeam(props.employee.TeamId);
        setChosenSeat(props.employee.seatNumber);
        setIsFullyVaccinatedAgainstCoronavirus(props.employee.isFullyVaccinatedAgainstCoronavirus);
        setIsWorkingNineEightySchedule(props.employee.isWorkingNineEightySchedule);
        setIsImmunocompromised(props.employee.isImmunocompromised);
        setIsSickWithCoronavirus(props.employee.isSickWithCoronavirus);
    }, [props.employee]);

    const onChosenEmployeeNameChange = useCallback(
        (event, newNameValue) => {
            setChosenEmployeeName(newNameValue || '');
        },
        [],
    );

    const onChosenEmployeeEmailAddressChange = useCallback(
        (event, newEmailAddressValue) => {
            setChosenEmployeeEmailAddress(newEmailAddressValue || '');
        },
        [],
    );

    function chooseTeam(event, teamChoice) {
        setChosenTeam(teamChoice.key);
    }

    function chooseSeat(event, seatChoice) {
        setChosenSeat(seatChoice.key);
    }

    function computeTeamChoice(teamsAll) {
        let ownTeamIndex = teamsAll.findIndex(team =>
            team.key === props.employee.TeamId);
        teamsAll[ownTeamIndex] = {
            key: props.employee.TeamId,
            text: "Present Team: " + props.employee.Team.name
        }
        return teamsAll;
    }

    function computeSeatChoice(employeeSeatLookUp) {
        let presentSeat = {
            key: props.employee.seatNumber,
            text: "Present Seat: " + props.employee.seatNumber
        };
        let emptySeatArr = [];
        for (let i = 1; i <= 20; i++) {
            if (!employeeSeatLookUp[i]) {
                emptySeatArr.push({
                    key: i,
                    text: i
                });
            }
        }
        return [presentSeat, ...emptySeatArr];
    }

    const onChangeIsFullyVaccinatedAgainstCoronavirus = useCallback(
        (ev, checked) => {
            setIsFullyVaccinatedAgainstCoronavirus(!!checked);
        },
        [],
    );

    const onChangeIsWorkingNineEightySchedule = useCallback(
        (ev, checked) => {
            setIsWorkingNineEightySchedule(!!checked);
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

    function updateEmployee() {
        let chosenSeatNearestNeighborID = chosenSeat % 2 === 1 ?
            props.employeeSeatLookUp[chosenSeat + 1] :
            props.employeeSeatLookUp[chosenSeat - 1];
        API.updateEmployee(props.employee.id, {
            name: chosenEmployeeName,
            emailAddress: chosenEmployeeEmailAddress,
            TeamId: chosenTeam,
            seatNumber: chosenSeat,
            nearestNeighborID: (chosenSeatNearestNeighborID &&
                chosenSeatNearestNeighborID !== props.employee.id) ?
                chosenSeatNearestNeighborID :
                null, // Empty chosenSeatNearestNeighborID still must be explicitly set
            isFullyVaccinatedAgainstCoronavirus: isFullyVaccinatedAgainstCoronavirus,
            isWorkingNineEightySchedule: isWorkingNineEightySchedule,
            isImmunocompromised: isImmunocompromised,
            isSickWithCoronavirus: isSickWithCoronavirus
        }).then(res => {
            setChosenEmployeeUpdated(true);
            console.log("Newly Updated Employee: " + JSON.stringify(res));
            if (chosenSeat !== props.employee.seatNumber) {
                if (props.employee.nearestNeighborID) {
                    API.updateEmployee(props.employee.nearestNeighborID, {
                        nearestNeighborID: null
                    }).then(res => {
                        console.log("Employee's Nearest Neighbor Updated: " + JSON.stringify(res));
                    });
                }
                if (chosenSeatNearestNeighborID &&
                    chosenSeatNearestNeighborID !== props.employee.id) {
                    API.updateEmployee(chosenSeatNearestNeighborID, {
                        nearestNeighborID: props.employee.id
                    }).then(res => {
                        console.log("Newly Updated Employee's Nearest Neighbor Updated: " + JSON.stringify(res));
                    });
                }
            }
            window.setTimeout(() => props.chooseMode(""), 1000);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Update {props.employee.name}'s Information
            </h2>
            {chosenEmployeeUpdated ?
            <h5>
                {props.employee.name}'s Information Updated!
            </h5>
            : <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <TextField
                        label="Employee's Name"
                        value={chosenEmployeeName}
                        onChange={onChosenEmployeeNameChange}
                        required />
                    <TextField
                        label="Employee's Email Address"
                        value={chosenEmployeeEmailAddress}
                        onChange={onChosenEmployeeEmailAddressChange}
                        required />
                    {props.teamsAll.length ?
                    <Dropdown
                        label={`Set ${props.employee.name}'s Team`}
                        selectedKey={chosenTeam ? chosenTeam.key : undefined}
                        onChange={chooseTeam}
                        placeholder={props.employee.Team.name}
                        options={computeTeamChoice(props.teamsAll)}
                        required />
                    : ""}
                    {Object.entries(props.employeeSeatLookUp).length ?
                    <Dropdown
                        label={`Assign ${props.employee.name}'s Seat`}
                        selectedKey={chosenSeat ? chosenSeat.key : undefined}
                        onChange={chooseSeat}
                        placeholder={props.employee.seatNumber}
                        options={computeSeatChoice(props.employeeSeatLookUp)}
                        required />
                    : ""}
                </Stack>
                <Stack {...columnProps}>
                    <Checkbox
                        label={`Is ${props.employee.name} fully vaccinated against the coronavirus?`}
                        checked={isFullyVaccinatedAgainstCoronavirus}
                        onChange={onChangeIsFullyVaccinatedAgainstCoronavirus} />
                    <Checkbox
                        label={`Is ${props.employee.name} choosing to work the 9/80 schedule?`}
                        checked={isWorkingNineEightySchedule}
                        onChange={onChangeIsWorkingNineEightySchedule} />
                    <Checkbox
                        label={`Is ${props.employee.name} immunocompromised?`}
                        checked={isImmunocompromised}
                        onChange={onChangeIsImmunocompromised} />
                    <Checkbox
                        label={`Is ${props.employee.name} sick with the coronavirus?`}
                        checked={isSickWithCoronavirus}
                        onChange={onChangeIsSickWithCoronavirus} />
                    <PrimaryButton
                        text={`Update ${props.employee.name}'s Information`}
                        onClick={() => updateEmployee()} />
                </Stack>
            </Stack>}
        </div>
    );
}

export default UpdateEmployee;
