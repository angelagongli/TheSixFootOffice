import React, { useState, useCallback } from "react";
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DayOfWeek } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};

function MakeRecurringEvent(props) {
    const [newEventName, setNewEventName] = useState("");
    const [newEventDescription, setNewEventDescription] = useState("");
    const [chosenTeam, setChosenTeam] = useState();
    const today = new Date();
    const [chosenDayOfWeek, setChosenDayOfWeek] = useState(today.getDay());
    const [chosenStartTime, setChosenStartTime] = useState();
    const [chosenEndTime, setChosenEndTime] = useState();
    const [chosenFrequency, setChosenFrequency] = useState();
    const [chosenWeekOfMonth, setChosenWeekOfMonth] = useState();
    const [newEventCreated, setNewEventCreated] = useState(false);
    const frequencyChoice = [
        {
            key: "Daily",
            text: "Daily"
        },
        {
            key: "Weekly",
            text: "Weekly"
        },
        {
            key: "Biweekly",
            text: "Biweekly"
        },
        {
            key: "Monthly",
            text: "Monthly"
        }
    ];

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

    function chooseDayOfWeek(event, dayOfWeekChoice) {
        setChosenDayOfWeek(dayOfWeekChoice.key);
    }

    function computeDayOfWeekChoice() {
        let dayArr = [];
        for (let i = 0; i < 7; i++) {
            dayArr.push({
                key: i,
                text: DayOfWeek[i]
            });
        }
        return dayArr;
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

    function chooseFrequency(event, frequencyChoice) {
        setChosenFrequency(frequencyChoice.key);
    }

    function chooseWeekOfMonth(event, weekOfMonthChoice) {
        setChosenWeekOfMonth(weekOfMonthChoice.key);
    }

    function computeWeekOfMonthChoice(frequencyChoice) {
        let weekOfMonthChoice = [];
        if (frequencyChoice === "Biweekly") {
            weekOfMonthChoice = [
                {
                    key: 0,
                    text: "First/Third Week of the Month"
                },
                {
                    key: 1,
                    text: "Second/Fourth Week of the Month"
                }
            ];
        } else if (frequencyChoice === "Monthly") {
            weekOfMonthChoice = [
                {
                    key: 0,
                    text: "First Week of the Month"
                },
                {
                    key: 1,
                    text: "Second Week of the Month"
                },
                {
                    key: 2,
                    text: "Third Week of the Month"
                },
                {
                    key: 3,
                    text: "Fourth Week of the Month"
                }
            ];
        }
        return weekOfMonthChoice;
    }

    function submitEvent() {
        API.makeRecurringEvent({
            name: newEventName,
            description: newEventDescription,
            startTime: chosenStartTime,
            endTime: chosenEndTime,
            frequency: chosenFrequency,
            dayOfWeek: chosenFrequency !== "Daily" ?
                chosenDayOfWeek :
                null, // Empty dayOfWeek still must be explicitly set
            weekOfMonth: chosenWeekOfMonth,
            TeamId: chosenTeam
        }).then(res => {
            setNewEventCreated(true);
            console.log("Newly Created Event: " + JSON.stringify(res));
            window.setTimeout(() => props.chooseMode(""), 1000);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Make Your Recurring Event
            </h2>
            {newEventCreated ?
            <h5>
                New Recurring Event Created!
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
                <Dropdown
                    label="Choose the Frequency of Your New Event"
                    selectedKey={chosenFrequency ? chosenFrequency : undefined}
                    onChange={chooseFrequency}
                    placeholder="Choose Your New Event's Frequency"
                    options={frequencyChoice}
                    required />
                {chosenFrequency && chosenFrequency !== "Daily" ?
                <Dropdown
                    label="Choose the Day of Week for Your New Event"
                    selectedKey={chosenDayOfWeek ? chosenDayOfWeek : undefined}
                    onChange={chooseDayOfWeek}
                    placeholder="Choose Your New Event's Day of the Week"
                    options={computeDayOfWeekChoice()}
                    required />
                : ""}
                {chosenFrequency && chosenFrequency === "Biweekly" ?
                <Dropdown
                    label="Choose the Week of Month for Your New Event"
                    selectedKey={chosenWeekOfMonth ? chosenWeekOfMonth : undefined}
                    onChange={chooseWeekOfMonth}
                    placeholder="Choose Your New Event's Week of the Month"
                    options={computeWeekOfMonthChoice("Biweekly")}
                    required />
                : (chosenFrequency && chosenFrequency === "Monthly" ?
                <Dropdown
                    label="Choose the Week of Month for Your New Event"
                    selectedKey={chosenWeekOfMonth ? chosenWeekOfMonth : undefined}
                    onChange={chooseWeekOfMonth}
                    placeholder="Choose Your New Event's Week of the Month"
                    options={computeWeekOfMonthChoice("Monthly")}
                    required />
                : "")}
                <PrimaryButton
                    text="Submit Event"
                    onClick={() => submitEvent()} />
            </Stack>}
        </div>
    );
}

export default MakeRecurringEvent;
