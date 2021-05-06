import React, { useState, useCallback } from "react";
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

function MakeTeam(props) {
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamCreated, setNewTeamCreated] = useState(false);

    const onNewTeamNameChange = useCallback(
        (event, newNameValue) => {
            setNewTeamName(newNameValue || '');
        },
        [],
    );

    function submitTeam() {
        API.makeTeam({
            name: newTeamName
        }).then(res => {
            setNewTeamCreated(true);
            console.log("Newly Created Team: " + JSON.stringify(res));
            window.setTimeout(() => props.chooseMode(""), 1000);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Make Your Team
            </h2>
            {newTeamCreated ?
            <h5>
                New Team Created!
            </h5>
            : <Stack {...columnProps}>
                <TextField
                    label="Team Name"
                    value={newTeamName}
                    onChange={onNewTeamNameChange}
                    required />
                <PrimaryButton
                    text="Submit Team"
                    onClick={() => submitTeam()} />
            </Stack>}
        </div>
    );
}

export default MakeTeam;
