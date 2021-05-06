import React, { useState, useEffect, useCallback } from "react";
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

function UpdateEvent(props) {
    const [chosenEventName, setChosenEventName] = useState(props.event.name);
    const [chosenEventDescription, setChosenEventDescription] = useState(props.event.description);
    const [chosenTeam, setChosenTeam] = useState(props.event.TeamSchedule.TeamId);
    const [chosenYear, chosenMonth, chosenDay] = props.event.date.split("-");
    const [chosenDate, setChosenDate] = useState(new Date(chosenYear, chosenMonth - 1, chosenDay));
    const [chosenStartTime, setChosenStartTime] = useState(props.event.startTime);
    const [chosenEndTime, setChosenEndTime] = useState(props.event.endTime);
    const [chosenEventUpdated, setChosenEventUpdated] = useState(false);
    const today = new Date();
    const maxAllowedDate = new Date(today.setDate(today.getDate() - today.getDay() + 19));

    useEffect(() => {
        setChosenEventName(props.event.name);
        setChosenEventDescription(props.event.description);
        setChosenTeam(props.event.TeamSchedule.TeamId);
        setChosenDate(new Date(chosenYear, chosenMonth - 1, chosenDay));
        setChosenStartTime(props.event.startTime);
        setChosenEndTime(props.event.endTime);
    }, [props.event]);

    const onChosenEventNameChange = useCallback(
        (event, newNameValue) => {
            setChosenEventName(newNameValue || '');
        },
        [],
    );

    const onChosenEventDescriptionChange = useCallback(
        (event, newDescriptionValue) => {
            setChosenEventDescription(newDescriptionValue || '');
        },
        [],
    );

    function chooseTeam(event, teamChoice) {
        setChosenTeam(teamChoice.key);
    }

    function computeTeamChoice(teamsAll) {
        let ownTeamIndex = teamsAll.findIndex(team =>
            team.key === props.event.TeamSchedule.TeamId);
        teamsAll[ownTeamIndex] = {
            key: props.event.TeamSchedule.TeamId,
            text: "Present Team: " +
                props.teamNameIDLookUp[props.event.TeamSchedule.TeamId]
        }
        return teamsAll;
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
                    key: (i < 10 ? "0" + i : i) + ":00:00",
                    text: `${hour}:00 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                },
                {
                    key: (i < 10 ? "0" + i : i) + ":30:00",
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
                    key: (i < 10 ? "0" + i : i) + ":00:00",
                    text: `${hour}:00 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                },
                {
                    key: (i < 10 ? "0" + i : i) + ":30:00",
                    text: `${hour}:30 ${Math.floor(i/12) < 1 ? "AM" : "PM"}`
                });
            }
        }
        let presentTimeSet = startEndTime === "Start" ?
            props.event.startTime : props.event.endTime;
        let [presentHourSet, presentMinuteSet] = presentTimeSet.split(":");
        let chosenTimeIndex = timeArr.findIndex(time =>
            startEndTime === "Start" ?
            time.key === props.event.startTime :
            time.key === props.event.endTime
        );
        timeArr[chosenTimeIndex] = {
            key: presentTimeSet,
            text: `Present Time Set: ${presentHourSet % 12 === 0 ?
                12 : presentHourSet % 12}:${presentMinuteSet} ${Math.floor(presentHourSet/12) < 1 ?
                "AM" : "PM"}`
        }
        return timeArr;
    }

    function updateEvent() {
        let beginningOfChosenWeek = new Date(chosenDate);
        beginningOfChosenWeek.setDate(beginningOfChosenWeek.getDate() - beginningOfChosenWeek.getDay() + 1);
        let chosenTeamScheduleID = null;
        API.getTeamScheduleByTeamWeek(chosenTeam,
            `${beginningOfChosenWeek.getFullYear()}-${beginningOfChosenWeek.getMonth() + 1}-${beginningOfChosenWeek.getDate()}`)
            .then(res => {
                chosenTeamScheduleID = res.data.id;
                if (chosenTeamScheduleID) {
                    API.updateEvent(props.event.id, {
                        name: chosenEventName,
                        description: chosenEventDescription,
                        date: `${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`,
                        startTime: chosenStartTime,
                        endTime: chosenEndTime,
                        TeamScheduleId: chosenTeamScheduleID,
                    }).then(res => {
                        setChosenEventUpdated(true);
                        console.log("Newly Updated Event: " + JSON.stringify(res));
                        window.setTimeout(() => props.chooseMode(""), 1000);
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                Update {props.event.name} Event Information
            </h2>
            {chosenEventUpdated ?
            <h5>
                {props.event.name} Event Information Updated!
            </h5>
            : <Stack {...columnProps}>
                <TextField
                    label="Event Name"
                    value={chosenEventName}
                    onChange={onChosenEventNameChange}
                    required />
                <TextField
                    label="Event Description"
                    value={chosenEventDescription}
                    onChange={onChosenEventDescriptionChange}
                    multiline />
                {props.teamsAll.length ?
                <Dropdown
                    label={`Choose the Team for ${props.event.name}`}
                    selectedKey={chosenTeam ? chosenTeam.key : undefined}
                    onChange={chooseTeam}
                    placeholder={props.teamNameIDLookUp[props.event.TeamSchedule.TeamId]}
                    options={computeTeamChoice(props.teamsAll)}
                    required />
                : ""}
                <DatePicker
                    label={`Choose the Date for ${props.event.name}`}
                    firstDayOfWeek={DayOfWeek.Sunday}
                    value={chosenDate}
                    onSelectDate={setChosenDate}
                    ariaLabel={`Choose the Date for ${props.event.name}`}
                    maxDate={maxAllowedDate}
                    isRequired />
                <Dropdown
                    label={`Choose the Start Time for ${props.event.name}`}
                    selectedKey={chosenStartTime ? chosenStartTime.key : undefined}
                    onChange={chooseStartTime}
                    placeholder={props.event.startTime}
                    options={computeTimeChoice("Start")}
                    required />
                <Dropdown
                    label={`Choose the End Time for ${props.event.name}`}
                    selectedKey={chosenEndTime ? chosenEndTime.key : undefined}
                    onChange={chooseEndTime}
                    placeholder={props.event.endTime}
                    options={computeTimeChoice("End")}
                    required />
                <PrimaryButton
                    text={`Update ${props.event.name} Event Information`}
                    onClick={() => updateEvent()} />
            </Stack>}
        </div>
    );
}

export default UpdateEvent;
