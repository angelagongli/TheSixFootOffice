// From React: Creating an Interactive Canvas Component on medium.com
import React, { useState, useEffect, useRef } from "react";
import API from "./API";

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .5;
export const canvasHeight = window.innerHeight * .5;

export function drawSeat(context, seat) {
    if (seat.inOfficeRequirement === "In Office AM") {
        context.fillStyle = 'rgb(200, 0, 0)';
    } else if (seat.inOfficeRequirement === "In Office PM") {
        context.fillStyle = 'rgba(0, 0, 200)';
    } else if (seat.inOfficeRequirement === "In Office All Day") {
        context.fillStyle = 'rgba(200, 0, 200)';
    }
    context.fillRect(10 + (seat.seatNumber - 1) * 60, 10, 50, 50);
}

export function useCanvas() {
    const canvasRef = useRef(null);
    const [seatCoordinates, setSeatCoordinates] = useState([]);
    const [daysAllOfficeAllOnChosenDate, setDaysAllOfficeAllOnChosenDate] = useState([]);
    const [inOfficeLookUp, setInOfficeLookUp] = useState({});

    useEffect(()=>{
        if (!Object.entries(inOfficeLookUp).length) {
            loadDaysAllOfficeAllOnChosenDate();
        }
        const canvasObject = canvasRef.current;
        const context = canvasObject.getContext('2d');
        context.clearRect( 0, 0, canvasWidth, canvasHeight );
        // seatCoordinates.forEach((seat)=>{drawSeat(context, seat)});
        for (const employee in inOfficeLookUp) {
            drawSeat(context, {
                // seatNumber: employeeSeatLookUp[employee],
                seatNumber: employee,
                inOfficeRequirement: inOfficeLookUp[employee]
            });
        }
    }, [inOfficeLookUp]);

    function loadDaysAllOfficeAllOnChosenDate() {
        API.getDaysAllByDate("2021-6-7")
            .then(res => {
                setDaysAllOfficeAllOnChosenDate(res.data);
                console.log("All days of all office on chosen date set");
                let inOfficeLookUp = {};
                for (const day of res.data) {
                    inOfficeLookUp[day.EmployeeSchedule.EmployeeId] = day.inOfficeRequirement;
                }
                setInOfficeLookUp(inOfficeLookUp);
                console.log("All employees/days in In Office Lookup set");
            }).catch(err => console.log(err));
    }

    return [ canvasRef, canvasWidth, canvasHeight ];
}
