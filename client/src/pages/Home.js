import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import OfficeSetting from "../components/OfficeSetting";
import OfficeSchedule from "../components/OfficeSchedule";
import OfficeFloorPlan from "../components/OfficeFloorPlan";
import Seat from "../components/Seat";
import API from "../utils/API";

function Home() {
    const [employeesAll, setEmployeesAll] = useState([]);
    const [employeeNameIDLookUp, setEmployeeNameIDLookUp] = useState({});
    const [inOfficeLookUp, setInOfficeLookUp] = useState({});
    const [chosenSeat, setChosenSeat] = useState();

    useEffect(() => {
        loadEmployeesAll();
    }, []);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            setEmployeesAll(res.data);
            console.log("All employees set");
            let employeeNameIDLookUp = {};
            for (const employee of res.data) {
                employeeNameIDLookUp[employee.id] = employee.name;
            }
            setEmployeeNameIDLookUp(employeeNameIDLookUp);
            console.log("All employees in Employee Name/ID Lookup set");
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
                <div className="col-9 col-sm-10 col-lg-11 container">
                    <h2>
                        Welcome to the Six-Foot Office
                    </h2>
                    <OfficeSetting />
                    <OfficeSchedule employeeNameIDLookUp={employeeNameIDLookUp} setInOfficeLookUp={setInOfficeLookUp} />
                    <OfficeFloorPlan chooseSeat={chooseSeat}
                        chosenSeat={chosenSeat}
                        inOfficeLookUp={inOfficeLookUp}
                        inOfficeEmployeesAll={employeesAll.filter(employee => inOfficeLookUp[employee.id])} />
                    {chosenSeat ?
                    <div>
                        <Seat employee={employeesAll.find(employee =>
                            employee.seatNumber === chosenSeat)} />
                    </div>
                    : ""}
                </div>
            </div>
        </div>
    );
}

export default Home;
