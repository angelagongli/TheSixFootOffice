import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";

function EmployeePage() {
    const [employeesAll, setEmployeesAll] = useState([]);

    useEffect(() => {
        loadEmployeesAll();
    }, []);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            setEmployeesAll(res.data);
            console.log("All employees set");
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
                    {employeesAll.length ?
                    employeesAll.map((employee) => (
                        <div key={employee.id}>
                            Employee ID: {employee.id},&nbsp;
                            Employee Name: {employee.name}
                        </div>
                    )) : ""}
                </div>
            </div>
        </div>
    );
}

export default EmployeePage;
