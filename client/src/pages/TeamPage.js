import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";

function TeamPage() {
    const [teamsAll, setTeamsAll] = useState([]);

    useEffect(() => {
        loadTeamsAll();
    }, []);

    function loadTeamsAll() {
        API.getTeamsAll().then(res => {
            setTeamsAll(res.data);
            console.log("All teams set");
        }).catch(err => console.log(err));
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
                    {teamsAll.length ?
                    teamsAll.map((team) => (
                        <div key={team.id}>
                            Team ID: {team.id},&nbsp;
                            Team Name: {team.name}
                        </div>
                    )) : ""}
                </div>
            </div>
        </div>
    );
}

export default TeamPage;
