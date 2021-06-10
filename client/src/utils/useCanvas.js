// From React: Creating an Interactive Canvas Component on medium.com
import React, { useState, useEffect, useRef } from "react";
import API from "./API";

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .66;
export const canvasHeight = window.innerHeight * .66;

const firstSeatUpperLeftX = 300;
const firstSeatUpperLeftY = 50;
const seatWidth = 150;
const seatHeight = 120;

const today = new Date();
let chosenDate = today;
if (today.getDay() === 0) {
    chosenDate = new Date(today.setDate(today.getDate() - 2));
} else if (today.getDay() === 6) {
    chosenDate = new Date(today.setDate(today.getDate() - 1));
}

export function drawSeat(context, seat) {
    switch (seat.inOfficeRequirement) {
        case "In Office AM":
            context.fillStyle = 'rgba(200, 0, 0, 0.66)';
            break;
        case "In Office PM":
            context.fillStyle = 'rgba(0, 0, 200, 0.66)';
            break;
        case "In Office All Day":
            context.fillStyle = 'rgba(200, 0, 200, 0.66)';
            break;
        default:
            context.fillStyle = 'rgba(0, 0, 0, 0.33)';
    }
    console.log("Drawing Seat: " + JSON.stringify(seat));
    context.fillRect(seat.upperLeftX, seat.upperLeftY, seatWidth, seatHeight);
    context.strokeStyle = 'rgba(0, 0, 0, 1)';
    context.strokeRect(seat.upperLeftX, seat.upperLeftY, seatWidth, seatHeight);
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.font = '11px sans-serif';
    context.fillText(`${seat.seatNumber}: ${seat.employeeName}`, seat.upperLeftX + seatWidth/3, seat.upperLeftY + seatHeight/2);
}

export function useCanvas() {
    const canvasRef = useRef(null);
    const [seatCoordinates, setSeatCoordinates] = useState([]);
    const [daysAllOfficeAllOnChosenDate, setDaysAllOfficeAllOnChosenDate] = useState([]);
    const [employeesAll, setEmployeesAll] = useState([]);
    const [inOfficeLookUp, setInOfficeLookUp] = useState({});

    useEffect(()=>{
        if (!Object.entries(inOfficeLookUp).length) {
            loadDaysAllOfficeAllOnChosenDate();
        }
        if (!employeesAll.length) {
            loadEmployeesAll();
        }
        if (!seatCoordinates.length) {
            computeSeatMapping();
        }
        if (Object.entries(inOfficeLookUp).length && employeesAll.length && seatCoordinates.length) {
            const canvasObject = canvasRef.current;
            const context = canvasObject.getContext('2d');
            context.clearRect( 0, 0, canvasWidth, canvasHeight );
            // seatCoordinates.forEach((seat)=>{drawSeat(context, seat)});
            const img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                console.log("Drawing Office Floor Plan");
                for (const employee of employeesAll) {
                    drawSeat(context, {
                        employeeName: employee.name,
                        seatNumber: employee.seatNumber,
                        inOfficeRequirement: inOfficeLookUp[employee.id],
                        upperLeftX: seatCoordinates[employee.seatNumber - 1].upperLeftX,
                        upperLeftY: seatCoordinates[employee.seatNumber - 1].upperLeftY
                    });
                }
            }
            img.src = "https://raw.githubusercontent.com/angelagongli/TheSixFootOffice/main/Office_FloorPlan.png";
        }
    }, [inOfficeLookUp, employeesAll, seatCoordinates]);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            setEmployeesAll(res.data);
            console.log("All employees set");
        }).catch(err => console.log(err));
    }

    function loadDaysAllOfficeAllOnChosenDate() {
        API.getDaysAllByDate(`${chosenDate.getFullYear()}-${chosenDate.getMonth() + 1}-${chosenDate.getDate()}`)
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

    function computeSeatMapping() {
        let seatCoordinates = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                seatCoordinates.push({
                    upperLeftX: firstSeatUpperLeftX + (j * seatWidth),
                    upperLeftY: firstSeatUpperLeftY + (i * seatHeight),
                })
            }
        }
        setSeatCoordinates(seatCoordinates);
    }

    return [ canvasRef, canvasWidth, canvasHeight ];
}
