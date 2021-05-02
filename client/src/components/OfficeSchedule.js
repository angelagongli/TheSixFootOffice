import React, { useState, useEffect, useCallback } from "react";
import DayCard from "./DayCard";
import { Calendar, DateRangeType, DayOfWeek } from '@fluentui/react';
import API from "../utils/API";

const dateRangeType = DateRangeType.Week;
const firstDayOfWeek = DayOfWeek.Sunday;

function OfficeSchedule(props) {
    const [chosenDate, setChosenDate] = useState(new Date());
    const [daysAllOfficeAllOnChosenDate, setDaysAllOfficeAllOnChosenDate] = useState([]);
    const inOfficeRequirementIconLookUp = {
        "In Office All Day": "BufferTimeBoth",
        "In Office AM": "BufferTimeBefore",
        "In Office PM": "BufferTimeAfter",
        "Home": "Home",
        "Day Off": "OutOfOffice"
    }

    useEffect(() => {
        loadDaysAllOfficeAllOnChosenDate();
    }, [chosenDate]);

    function loadDaysAllOfficeAllOnChosenDate() {
        if (chosenDate) {
            API.getDaysAllByDate(`${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`)
                .then(res => {
                    setDaysAllOfficeAllOnChosenDate(res.data);
                    console.log("All days of all office on chosen date set");
                }).catch(err => console.log(err));
        }
    }

    const onChooseDate = useCallback(date => {
        setChosenDate(date);
    }, []);

    function formatDate(dateString) {
        const [year, month, date] = dateString.split("-");
        return `${month}/${date}/${year}`;
    }

    return (
        <div className="row g-0">
            <div className="col-6 col-lg-4 container">
                <h5>
                    Chosen Date: {chosenDate?.toDateString() || 'Chosen Date Not Yet Set'}
                </h5>
                <Calendar
                    dateRangeType={dateRangeType}
                    highlightChosenMonth
                    showGoToToday
                    onSelectDate={onChooseDate}
                    value={chosenDate}
                    firstDayOfWeek={firstDayOfWeek}
                    navigationIcons={{
                        leftNavigation: 'Back',
                        rightNavigation: 'Forward'
                    }} />
            </div>
            <div className="col-6 col-lg-8 container">
                {daysAllOfficeAllOnChosenDate.length ?
                <div>
                    <h5>
                        Schedule of All Office on {chosenDate.toDateString()}
                    </h5>
                    <div className="dayCardContainer">
                        {daysAllOfficeAllOnChosenDate.map(day => (
                            <DayCard
                                key={day.id}
                                heading={`${props.employeeNameIDLookUp[day.EmployeeSchedule.EmployeeId]}, 
                                    ${formatDate(day.date)}`}
                                inOfficeRequirementIcon={inOfficeRequirementIconLookUp[day.inOfficeRequirement]}
                                inOfficeRequirement={day.inOfficeRequirement} />
                        ))}
                    </div>
                </div>
                : ""}
            </div>
        </div>
    );
}

export default OfficeSchedule;
