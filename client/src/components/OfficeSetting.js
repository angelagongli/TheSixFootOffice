import React, { useState, useEffect } from "react";
import API from "../utils/API";

function OfficeSetting(props) {
    const [officeSetting, setOfficeSetting] = useState();
    const today = new Date();
    const beginningOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    useEffect(() => {
        loadOfficeSetting();
    }, []);

    function loadOfficeSetting() {
        API.getOfficeSettingByWeek(
            `${beginningOfWeek.getFullYear()}-${beginningOfWeek.getMonth() + 1}-${beginningOfWeek.getDate() + 1}`)
            .then(res => {
                setOfficeSetting(res.data);
                console.log("Office Setting for the Week Set");
            }).catch(err => console.log(err));
    }

    function formatDate(dateString) {
        const [year, month, date] = dateString.split("-");
        return `${month}/${date}/${year}`;
    }

    return (
        <div className="row g-0">
            <div className="col-12 container">
                <h5>
                    In the Office Today
                </h5>
                {officeSetting ?
                <div className="officeSettingContainer">
                    <div className="officeSettingCard">
                        The Office's Reopening Setting for the Week of {formatDate(officeSetting.weekOf)}
                    </div>
                    <div className="officeSettingCard ms-depth-4">
                        The Maximum Allowed Capacity in the Office Is <span className="highlight">{officeSetting.maxAllowedOfficeCapacityPercentage}%</span>
                    </div>
                    <div className="officeSettingCard ms-depth-4">
                        The Office's City Is in the <span className="highlight">{officeSetting.officeCityReopeningPhase}</span> Reopening Phase
                    </div>
                    <div className="officeSettingCard ms-depth-4">
                        <span className="highlight">{officeSetting.isMaskWearingRequired ? "You Are Required" : "You Have the Choice"}</span> to Wear Your Mask in the Office
                    </div>
                </div>
                : ""}
            </div>
        </div>
    );
}

export default OfficeSetting;
