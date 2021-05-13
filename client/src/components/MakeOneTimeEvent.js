import React, { useState, useCallback } from "react";
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DatePicker, DayOfWeek } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

function MakeOneTimeEvent(props) {
    const [newEventName, setNewEventName] = useState("");
    const [newEventDescription, setNewEventDescription] = useState("");
    const [chosenTeam, setChosenTeam] = useState();
    const [chosenDate, setChosenDate] = useState(new Date());
    const [chosenStartTime, setChosenStartTime] = useState();
    const [chosenEndTime, setChosenEndTime] = useState();
    const [newEventCreated, setNewEventCreated] = useState(false);
    const today = new Date();
    const maxAllowedDate = new Date(today.setDate(today.getDate() - today.getDay() + 19));

    const onNewEventNameChange = useCallback(
        (event, newNameValue) => {
            setNewEventName(newNameValue || '');
        },
        [],
    );

    const onNewEventDescriptionChange = useCallback(
        (event, newDescriptionValue) => {
            setNewEventDescription(newDescriptionValue || '');
        },
        [],
    );

    function chooseTeam(event, teamChoice) {
        setChosenTeam(teamChoice.key);
    }

    function chooseStartTime(event, timeChoice) {
        setChosenStartTime(timeChoice.key);
    }

    function chooseEndTime(event, timeChoice) {
        setChosenEndTime(timeChoice.key);
    }

    function computeTimeChoice(startEndTime) {
        let timeArr = [];
        let startTimeHour = 5;
        let endTimeHour = 20;
        if (startEndTime === "Start") {
            if (chosenEndTime) {
                endTimeHour = chosenEndTime.split(":")[0];
            }
            for (let i = 5; i < 21; i++) {
                if (i > endTimeHour) {
                    break;
                }
                let hour = i % 12 === 0 ? 12 : i % 12;
                timeArr.push({
                    key: i + ":00:00",
                    text: `${hour}:00 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                },
                {
                    key: i + ":30:00",
                    text: `${hour}:30 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                });
            }
        } else {
            if (chosenStartTime) {
                startTimeHour = chosenStartTime.split(":")[0];
            }
            for (let i = 5; i < 21; i++) {
                if (i < startTimeHour) {
                    continue;
                }
                let hour = i % 12 === 0 ? 12 : i % 12;
                timeArr.push({
                    key: i + ":00:00",
                    text: `${hour}:00 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                },
                {
                    key: i + ":30:00",
                    text: `${hour}:30 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                });
            }
        }
        return timeArr;
    }

    function submitEvent() {
        let beginningOfChosenWeek = new Date(chosenDate);
        beginningOfChosenWeek.setDate(beginningOfChosenWeek.getDate() - beginningOfChosenWeek.getDay() + 1);
        let chosenTeamScheduleID = null;
        API.getTeamScheduleByTeamWeek(chosenTeam,
            `${beginningOfChosenWeek.getFullYear()}-${beginningOfChosenWeek.getMonth() + 1}-${beginningOfChosenWeek.getDate()}`)
            .then(res => {
                chosenTeamScheduleID = res.data.id;
                if (chosenTeamScheduleID) {
                    API.makeEvent({
                        name: newEventName,
                        description: newEventDescription,
                        date: `${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`,
                        startTime: chosenStartTime,
                        endTime: chosenEndTime,
                        TeamScheduleId: chosenTeamScheduleID
                    }).then(res => {
                        setNewEventCreated(true);
                        console.log("Newly Created Event: " + JSON.stringify(res));
                        window.setTimeout(() => props.chooseMode(""), 1000);
                    });
                }
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Make Your Event
            </h2>
            {newEventCreated ?
            <h5>
                New Event Created!
            </h5>
            : <Stack {...columnProps}>
                <TextField
                    label="Event Name"
                    value={newEventName}
                    onChange={onNewEventNameChange}
                    required />
                <TextField
                    label="Event Description"
                    value={newEventDescription}
                    onChange={onNewEventDescriptionChange}
                    multiline />
                {props.teamsAll.length ?
                <Dropdown
                    label="Choose the Team for Your New Event"
                    selectedKey={chosenTeam ? chosenTeam : undefined}
                    onChange={chooseTeam}
                    placeholder="Choose Your Team"
                    options={props.teamsAll}
                    required />
                : ""}
                <DatePicker
                    label="Choose the Date for Your New Event"
                    firstDayOfWeek={DayOfWeek.Sunday}
                    value={chosenDate}
                    onSelectDate={setChosenDate}
                    ariaLabel="Choose the Date for Your New Event"
                    maxDate={maxAllowedDate}
                    isRequired />
                <Dropdown
                    label="Choose the Start Time for Your New Event"
                    selectedKey={chosenStartTime ? chosenStartTime : undefined}
                    onChange={chooseStartTime}
                    placeholder="Choose Your New Event's Start Time"
                    options={computeTimeChoice("Start")}
                    required />
                <Dropdown
                    label="Choose the End Time for Your New Event"
                    selectedKey={chosenEndTime ? chosenEndTime : undefined}
                    onChange={chooseEndTime}
                    placeholder="Choose Your New Event's End Time"
                    options={computeTimeChoice("End")}
                    required />
                <PrimaryButton
                    text="Submit Event"
                    onClick={() => submitEvent()} />
            </Stack>}
        </div>
    );
}

export default MakeOneTimeEvent;
