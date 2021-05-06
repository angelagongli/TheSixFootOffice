import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import TeamCard from "../components/TeamCard";
import ChosenTeam from "../components/ChosenTeam";
import MakeTeam from "../components/MakeTeam";
import UpdateTeam from "../components/UpdateTeam";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import API from "../utils/API";

function TeamPage() {
    const [teamsAll, setTeamsAll] = useState([]);
    const [chosenTeam, setChosenTeam] = useState();
    const [mode, setMode] = useState("");

    useEffect(() => {
        loadTeamsAll();
    }, [mode]);

    function loadTeamsAll() {
        API.getTeamsAll().then(res => {
            setTeamsAll(res.data);
            console.log("All teams set");
        }).catch(err => console.log(err));
    }

    function chooseTeam(teamID) {
        setChosenTeam(teamID);
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
                        <div className="col-6 col-lg-4 container">
                            <h2>
                                Team Section
                            </h2>
                            <PrimaryButton
                                text="Make Team"
                                onClick={() => chooseMode("Make")} />
                            {teamsAll.length ?
                            <div className="cardContainer">
                                {teamsAll.map(team => (
                                    <TeamCard
                                        key={team.id}
                                        team={team}
                                        chooseTeam={chooseTeam}
                                        chooseMode={chooseMode} />
                                ))}
                            </div>
                            : ""}
                        </div>
                        <div className="col-6 col-lg-8 container">
                            {mode ?
                            ((mode === "View" && chosenTeam) ?
                            <ChosenTeam team={teamsAll.find(team =>
                                team.id === chosenTeam)} />
                            : ((mode === "Update" && chosenTeam) ?
                            <UpdateTeam team={teamsAll.find(team =>
                                team.id === chosenTeam)}
                                teamsAll={teamsAll}
                                chooseMode={chooseMode} />
                            : (mode === "Make" ?
                            <MakeTeam teamsAll={teamsAll}
                                chooseMode={chooseMode} />
                            : "")))
                            : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamPage;
