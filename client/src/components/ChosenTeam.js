import React, { useState, useEffect } from "react";
import TeamSchedule from "./TeamSchedule";
import API from "../utils/API";

function ChosenTeam(props) {
    const [teamSchedule, setTeamSchedule] = useState();
    const today = new Date();
    const beginningOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    useEffect(() => {
        loadTeamSchedule();
    }, [props.team]);

    function loadTeamSchedule() {
        API.getTeamScheduleByTeamWeek(props.team.id,
            `${beginningOfWeek.getFullYear()}-${beginningOfWeek.getMonth() + 1}-${beginningOfWeek.getDate()}`)
            .then(res => {
                setTeamSchedule(res.data);
                console.log("Team's schedule set");
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <h2>
                {props.team.name} Team's Schedule for the Week
            </h2>
            {teamSchedule && teamSchedule.Events.length ?
            <TeamSchedule events={teamSchedule.Events} />
            : ""}
        </div>
    );
}

export default ChosenTeam;
