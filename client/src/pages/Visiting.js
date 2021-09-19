import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AddVisitor from "../components/AddVisitor";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";

function Visiting() {
    const [employeesAll, setEmployeesAll] = useState([]);
    const [visitorsAll, setVisitorsAll] = useState([]);
    const [mode, setMode] = useState("");

    useEffect(() => {
        loadEmployeesAll();
        loadVisitorsAll();
    }, [mode]);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            let employeeKeyName = [];
            for (const employee of res.data) {
                employeeKeyName.push({
                    key: employee.id,
                    text: employee.name
                });
            }
            setEmployeesAll(employeeKeyName);
            console.log("All employees set");
        }).catch(err => console.log(err));
    }

    function loadVisitorsAll() {
        API.getVisitorsAll().then(res => {
            setVisitorsAll(res.data);
            console.log("All visitors set");
        }).catch(err => console.log(err));
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
                <div className="col-9 col-sm-10 col-lg-11 container">
                    <h2>
                        Visiting the Office
                    </h2>
                    <h5>
                        Please complete the following for your visitor, you can ask him/her to fill it out himself/herself as well if you do not know his/her information:
                    </h5>
                    {employeesAll.length ?
                    <AddVisitor
                        employeesAll={employeesAll}
                        chooseMode={chooseMode} />
                    : ""}
                </div>
            </div>
        </div>
    );
}

export default Visiting;
