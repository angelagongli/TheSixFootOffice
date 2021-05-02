import React, { useState, useCallback } from "react";
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

function AddEmployee(props) {
    const [newEmployeeName, setNewEmployeeName] = useState("");
    const [chosenTeam, setChosenTeam] = useState();
    const [chosenSeat, setChosenSeat] = useState();
    const [isFullyVaccinatedAgainstCoronavirus, setIsFullyVaccinatedAgainstCoronavirus] = useState(false);
    const [isWorkingNineEightySchedule, setIsWorkingNineEightySchedule] = useState(false);
    const [isImmunocompromised, setIsImmunocompromised] = useState(false);
    const [isSickWithCoronavirus, setIsSickWithCoronavirus] = useState(false);
    const [newEmployeeAdded, setNewEmployeeAdded] = useState(false);

    const onNewEmployeeNameChange = useCallback(
        (event, newNameValue) => {
            setNewEmployeeName(newNameValue || '');
        },
        [],
    );

    function chooseTeam(event, teamChoice) {
        setChosenTeam(teamChoice.key);
    }

    function chooseSeat(event, seatChoice) {
        setChosenSeat(seatChoice.key);
    }

    function computeSeatChoice(employeeSeatLookUp) {
        let emptySeatArr = [];
        for (let i = 1; i <= 20; i++) {
            if (!employeeSeatLookUp[i]) {
                emptySeatArr.push({
                    key: i,
                    text: i
                });
            }
        }
        return emptySeatArr;
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

    function submitEmployee() {
        let chosenSeatNearestNeighborID = chosenSeat % 2 === 1 ?
            props.employeeSeatLookUp[chosenSeat + 1] :
            props.employeeSeatLookUp[chosenSeat - 1];
        API.addEmployee({
            name: newEmployeeName,
            TeamId: chosenTeam,
            seatNumber: chosenSeat,
            nearestNeighborID: chosenSeatNearestNeighborID,
            isFullyVaccinatedAgainstCoronavirus: isFullyVaccinatedAgainstCoronavirus,
            isWorkingNineEightySchedule: isWorkingNineEightySchedule,
            isImmunocompromised: isImmunocompromised,
            isSickWithCoronavirus: isSickWithCoronavirus
        }).then(res => {
            setNewEmployeeAdded(true);
            console.log("Newly Added Employee: " + JSON.stringify(res));
            if (chosenSeatNearestNeighborID) {
                API.updateEmployee(chosenSeatNearestNeighborID, {
                    nearestNeighborID: res.data.id
                }).then(res => {
                    console.log("Newly Added Employee's Nearest Neighbor Updated: " + JSON.stringify(res));
                    window.setTimeout(() => props.chooseMode(""), 1000);
                });
            }
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Add Your Employee
            </h2>
            {newEmployeeAdded ?
            <h5>
                New Employee Added!
            </h5>
            : <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <TextField
                        label="Employee's Name"
                        value={newEmployeeName}
                        onChange={onNewEmployeeNameChange}
                        required
                    />
                    {props.teamsAll.length ?
                    <Dropdown
                        label="Choose Your New Employee's Team"
                        selectedKey={chosenTeam ? chosenTeam.key : undefined}
                        onChange={chooseTeam}
                        placeholder="Choose Your Team"
                        options={props.teamsAll} />
                    : ""}
                    {Object.entries(props.employeeSeatLookUp).length ?
                    <Dropdown
                        label="Assign Your New Employee's Seat"
                        selectedKey={chosenSeat ? chosenSeat.key : undefined}
                        onChange={chooseSeat}
                        placeholder="Choose Your Seat"
                        options={computeSeatChoice(props.employeeSeatLookUp)} />
                    : ""}
                </Stack>
                <Stack {...columnProps}>
                    <Checkbox
                        label="Is your new employee fully vaccinated against the coronavirus?"
                        checked={isFullyVaccinatedAgainstCoronavirus}
                        onChange={onChangeIsFullyVaccinatedAgainstCoronavirus} />
                    <Checkbox
                        label="Is your new employee choosing to work the 9/80 schedule?"
                        checked={isWorkingNineEightySchedule}
                        onChange={onChangeIsWorkingNineEightySchedule} />
                    <Checkbox
                        label="Is your new employee immunocompromised?"
                        checked={isImmunocompromised}
                        onChange={onChangeIsImmunocompromised} />
                    <Checkbox
                        label="Is your new employee sick with the coronavirus?"
                        checked={isSickWithCoronavirus}
                        onChange={onChangeIsSickWithCoronavirus} />
                    <PrimaryButton
                        text="Submit Employee"
                        onClick={() => submitEmployee()} />
                </Stack>
            </Stack>}
        </div>
    );
}

export default AddEmployee;
