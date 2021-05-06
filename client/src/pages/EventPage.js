import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import EventCard from "../components/EventCard";
import MakeOneTimeEvent from "../components/MakeOneTimeEvent";
// import MakeRecurringEvent from "../components/MakeRecurringEvent";
import UpdateEvent from "../components/UpdateEvent";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import API from "../utils/API";

function EventPage() {
    const [upcomingEventsAll, setUpcomingEventsAll] = useState([]);
    const [teamsAll, setTeamsAll] = useState([]);
    const [teamNameIDLookUp, setTeamNameIDLookUp] = useState({});
    const [chosenEvent, setChosenEvent] = useState();
    const [chosenTeam, setChosenTeam] = useState();
    const [mode, setMode] = useState("");
    const today = new Date();

    useEffect(() => {
        loadUpcomingEventsAll();
        loadTeamsAll();
    }, [mode]);

    function loadUpcomingEventsAll() {
        API.getUpcomingEventsAllFollowingDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
            .then(res => {
                setUpcomingEventsAll(res.data);
                console.log("All upcoming events set");
            }).catch(err => console.log(err));
    }

    function loadTeamsAll() {
        API.getTeamsAll().then(res => {
            let teamKeyName = [{
                key: "All",
                text: "All Office"
            }];
            let teamNameIDLookUp = {};
            for (const team of res.data) {
                teamKeyName.push({
                    key: team.id,
                    text: team.name
                });
                teamNameIDLookUp[team.id] = team.name;
            }
            setTeamsAll(teamKeyName);
            console.log("All teams set");
            setTeamNameIDLookUp(teamNameIDLookUp);
            console.log("All teams in Team Name/ID Lookup set");
        }).catch(err => console.log(err));
    }

    function chooseEvent(eventID) {
        setChosenEvent(eventID);
    }

    function chooseTeam(event, teamChoice) {
        setChosenTeam(teamChoice.key);
    }

    function chooseMode(mode) {
        setMode(mode);
    }

    return (
        <div>
            <div className="row g-0">
                <div className="col-12">
                    <Header />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-3 col-sm-2 col-lg-1">
                    <Navigation />
                </div>
                <div className="col-9 col-sm-10 col-lg-11">
                    <div className="row g-0">
                        <div className="col-6 col-lg-8 container">
                            <h2>
                                Event Section
                            </h2>
                            <div className="buttonContainer">
                                <PrimaryButton
                                    text="Make One-Time Event"
                                    onClick={() => chooseMode("MakeOneTimeEvent")} />
                                <DefaultButton
                                    text="Make Recurring Event"
                                    onClick={() => chooseMode("MakeRecurringEvent")} />
                            </div>
                            <h5>
                                All Upcoming Events in the Office
                            </h5>
                            {teamsAll.length ?
                            <Dropdown
                                label="Restrict Events to Your Chosen Team"
                                selectedKey={chosenTeam ? chosenTeam.key : undefined}
                                onChange={chooseTeam}
                                placeholder="Choose Your Team"
                                options={teamsAll}
                                styles={{ dropdown: { width: 300 } }} />
                            : ""}
                            <div className="cardContainer eventCardContainer">
                                {upcomingEventsAll.length && Object.entries(teamNameIDLookUp).length ?
                                (chosenTeam && chosenTeam !== "All" ?
                                upcomingEventsAll.filter(event =>
                                event.TeamSchedule.TeamId === chosenTeam).map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        view="Team"
                                        enableUpdate={true}
                                        chooseEvent={chooseEvent}
                                        chooseMode={chooseMode} />
                                )) : upcomingEventsAll.map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        view="All Office"
                                        teamName={teamNameIDLookUp[event.TeamSchedule.TeamId]}
                                        enableUpdate={true}
                                        chooseEvent={chooseEvent}
                                        chooseMode={chooseMode} />
                                ))) : ""}
                            </div>
                        </div>
                        <div className="col-6 col-lg-4 container">
                            {mode ?
                            ((mode === "Update" && chosenEvent) ?
                            <UpdateEvent event={upcomingEventsAll.find(event =>
                                event.id === chosenEvent)}
                                teamsAll={teamsAll.filter(team =>
                                    team.key !== "All")}
                                teamNameIDLookUp={teamNameIDLookUp}
                                chooseMode={chooseMode} />
                            : (mode === "MakeOneTimeEvent" ?
                            <MakeOneTimeEvent teamsAll={teamsAll.filter(team =>
                                team.key !== "All")}
                                chooseMode={chooseMode} />
                            : (mode === "MakeRecurringEvent" ?
                            `<MakeRecurringEvent teamsAll={teamsAll.filter(team =>
                                team.key !== "All")}
                                chooseMode={chooseMode} />`
                            : "")))
                            : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventPage;
