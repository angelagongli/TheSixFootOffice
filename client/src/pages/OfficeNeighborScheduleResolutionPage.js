import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Navigation } from "../components/Navigation";
import OfficeNeighborScheduleRequestWeek from "../components/OfficeNeighborScheduleRequestWeek";
import API from "../utils/API";

function OfficeNeighborScheduleResolutionPage() {
    const [officeNeighborScheduleResolution, setOfficeNeighborScheduleResolution] = useState({});
    const [officeNeighborScheduleRequestsAll, setOfficeNeighborScheduleRequestsAll] = useState([]);
    const [nearestOfficeNeighborASchedule, setNearestOfficeNeighborASchedule] = useState();
    const [nearestOfficeNeighborBSchedule, setNearestOfficeNeighborBSchedule] = useState();
    const [officeNeighborScheduleRequestUpdated, setOfficeNeighborScheduleRequestUpdated] = useState(false);
    const { ID } = useParams();

    useEffect(() => {
        loadOfficeNeighborScheduleResolution();
        window.setTimeout(() => setOfficeNeighborScheduleRequestUpdated(false), 1000);
    }, [officeNeighborScheduleRequestUpdated]);

    function loadOfficeNeighborScheduleResolution() {
        API.getOfficeNeighborScheduleResolutionByID(ID)
            .then(res => {
                setOfficeNeighborScheduleResolution(res.data);
                console.log("Office Neighbor Schedule Resolution Set");
                API.getEmployeeScheduleByEmployeeWeek(res.data.NearestOfficeNeighborAId,
                    res.data.weekOf)
                    .then(res => {
                        setNearestOfficeNeighborASchedule(res.data);
                        console.log("Nearest Office Neighbor A's Schedule Set");
                    });
                API.getEmployeeScheduleByEmployeeWeek(res.data.NearestOfficeNeighborBId,
                    res.data.weekOf)
                    .then(res => {
                        setNearestOfficeNeighborBSchedule(res.data);
                        console.log("Nearest Office Neighbor B's Schedule Set");
                    });
            }).catch(err => console.log(err));
        API.getOfficeNeighborScheduleRequestsAllByOfficeNeighborScheduleResolution(ID)
            .then(res => {
                setOfficeNeighborScheduleRequestsAll(res.data);
                console.log("All Office Neighbor Schedule Requests Set");
            }).catch(err => console.log(err));
    }

    function formatDate(dateString) {
        const [year, month, date] = dateString.split("-");
        return `${month}/${date}/${year}`;
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
                        Office Neighbor Schedule Resolution
                    </h2>
                    {Object.entries(officeNeighborScheduleResolution).length ?
                    <h5>
                        Between {officeNeighborScheduleResolution.NearestOfficeNeighborA.name} and {officeNeighborScheduleResolution.NearestOfficeNeighborB.name} for the Week of {formatDate(officeNeighborScheduleResolution.weekOf)}
                    </h5>
                    : ""}
                    {officeNeighborScheduleRequestUpdated ? "Your In Office Requirement Request for the Week Has Been Submitted!" : ""}
                    {officeNeighborScheduleRequestsAll.length && nearestOfficeNeighborASchedule ?
                    <OfficeNeighborScheduleRequestWeek
                        employee={nearestOfficeNeighborASchedule.Employee}
                        employeeScheduleDays={nearestOfficeNeighborASchedule.Days}
                        officeNeighborScheduleRequestDays={officeNeighborScheduleRequestsAll[0].OfficeNeighborScheduleRequestDays}
                        officeNeighborScheduleRequestID={officeNeighborScheduleRequestsAll[0].id}
                        officeNeighborScheduleRequestPhase={officeNeighborScheduleRequestsAll[0].officeNeighborScheduleRequestPhase}
                        setOfficeNeighborScheduleRequestUpdated={setOfficeNeighborScheduleRequestUpdated}
                    />
                    : ""}
                    {officeNeighborScheduleRequestsAll.length && nearestOfficeNeighborBSchedule ?
                    <OfficeNeighborScheduleRequestWeek
                        employee={nearestOfficeNeighborBSchedule.Employee}
                        employeeScheduleDays={nearestOfficeNeighborBSchedule.Days}
                        officeNeighborScheduleRequestDays={officeNeighborScheduleRequestsAll[1].OfficeNeighborScheduleRequestDays}
                        officeNeighborScheduleRequestID={officeNeighborScheduleRequestsAll[1].id}
                        officeNeighborScheduleRequestPhase={officeNeighborScheduleRequestsAll[1].officeNeighborScheduleRequestPhase}
                        setOfficeNeighborScheduleRequestUpdated={setOfficeNeighborScheduleRequestUpdated}
                    />
                    : ""}
                </div>
            </div>
        </div>
    );
}

export default OfficeNeighborScheduleResolutionPage;
