import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import OfficeSchedule from "../components/OfficeSchedule";
import OfficeFloorPlan from "../components/OfficeFloorPlan";
import Seat from "../components/Seat";
import API from "../utils/API";

function Home() {
    const [employeesAll, setEmployeesAll] = useState([]);
    const [teamsAll, setTeamsAll] = useState([]);
    const [chosenSeat, setChosenSeat] = useState();

    useEffect(() => {
        loadEmployeesAll();
        loadTeamsAll();
    }, []);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            setEmployeesAll(res.data);
            console.log("All employees set");
        }).catch(err => console.log(err));
    }

    function loadTeamsAll() {
        API.getTeamsAll().then(res => {
            setTeamsAll(res.data);
            console.log("All teams set");
        }).catch(err => console.log(err));
    }

    function chooseSeat(seatNumber) {
        setChosenSeat(seatNumber);
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
                    <OfficeSchedule />
                    <OfficeFloorPlan chooseSeat={chooseSeat} />
                    {chosenSeat ?
                    <div>
                        <Seat seatNumber={chosenSeat}
                            employee={employeesAll.find(employee =>
                                employee.seatNumber === chosenSeat)}
                            team={teamsAll.find(team =>
                                team.id === employeesAll.find(employee =>
                                employee.seatNumber === chosenSeat).TeamId)} />
                    </div>
                    : ""}
                </div>
            </div>
        </div>
    );
}

export default Home;
