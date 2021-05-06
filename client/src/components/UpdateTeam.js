import React, { useState, useEffect, useCallback } from "react";
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

function UpdateTeam(props) {
    const [chosenTeamName, setChosenTeamName] = useState(props.team.name);
    const [chosenTeamUpdated, setChosenTeamUpdated] = useState(false);

    useEffect(() => {
        setChosenTeamName(props.team.name);
    }, [props.team]);

    const onChosenTeamNameChange = useCallback(
        (event, newNameValue) => {
            setChosenTeamName(newNameValue || '');
        },
        [],
    );

    function updateTeam() {
        API.updateTeam(props.team.id, {
            name: chosenTeamName
        }).then(res => {
            setChosenTeamUpdated(true);
            console.log("Newly Updated Team: " + JSON.stringify(res));
            window.setTimeout(() => props.chooseMode(""), 1000);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Update the {props.team.name} Team's Name
            </h2>
            {chosenTeamUpdated ?
            <h5>
                {props.team.name} Team Name Updated!
            </h5>
            : <Stack {...columnProps}>
                <TextField
                    label="Team Name"
                    value={chosenTeamName}
                    onChange={onChosenTeamNameChange}
                    required />
                <PrimaryButton
                    text={`Update the ${props.team.name} Team's Name`}
                    onClick={() => updateTeam()} />
            </Stack>}
        </div>
    );
}

export default UpdateTeam;
