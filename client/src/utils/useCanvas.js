// From React: Creating an Interactive Canvas Component on medium.com
import React, { useState, useEffect, useRef } from "react";
import API from "./API";

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .66;
export const canvasHeight = window.innerHeight * .66;

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
    console.log("Drawing Seat");
    context.fillRect(300 + (seat.seatNumber - 1) * 150, 50, 150, 120);
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.font = '11px sans-serif';
    context.fillText(`${seat.seatNumber}: ${seat.employeeName}`, 350 + (seat.seatNumber - 1) * 150, 110);
}

export function useCanvas() {
    const canvasRef = useRef(null);
    const [seatCoordinates, setSeatCoordinates] = useState([]);
    const [daysAllOfficeAllOnChosenDate, setDaysAllOfficeAllOnChosenDate] = useState([]);
    const [employeesAll, setEmployeesAll] = useState([]);
    const [inOfficeLookUp, setInOfficeLookUp] = useState({});
    const [employeeNameSeatLookUp, setEmployeeNameSeatLookUp] = useState({});

    useEffect(()=>{
        if (!Object.entries(inOfficeLookUp).length) {
            loadDaysAllOfficeAllOnChosenDate();
        }
        if (!Object.entries(employeeNameSeatLookUp).length) {
            loadEmployeesAll();
        }
        if (Object.entries(inOfficeLookUp).length && Object.entries(employeeNameSeatLookUp).length) {
            const canvasObject = canvasRef.current;
            const context = canvasObject.getContext('2d');
            context.clearRect( 0, 0, canvasWidth, canvasHeight );
            // seatCoordinates.forEach((seat)=>{drawSeat(context, seat)});
            const img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                console.log("Drawing Office Floor Plan");
                // if (Object.entries(inOfficeLookUp).length && Object.entries(employeeNameSeatLookUp).length) {
                    for (const employeeID in inOfficeLookUp) {
                        drawSeat(context, {
                            employeeName: employeeNameSeatLookUp[employeeID].name,
                            seatNumber: employeeNameSeatLookUp[employeeID].seatNumber,
                            inOfficeRequirement: inOfficeLookUp[employeeID]
                        });
                    }
                // }
            }
            img.src = "https://raw.githubusercontent.com/angelagongli/TheSixFootOffice/main/Office_FloorPlan.png";
        }
    }, [inOfficeLookUp, employeeNameSeatLookUp]);

    function loadEmployeesAll() {
        API.getEmployeesAll().then(res => {
            setEmployeesAll(res.data);
            console.log("All employees set");
            let employeeNameSeatLookUp = {};
            for (const employee of res.data) {
                employeeNameSeatLookUp[employee.id] = {
                    name: employee.name,
                    seatNumber: employee.seatNumber
                };
            }
            setEmployeeNameSeatLookUp(employeeNameSeatLookUp);
            console.log("All employees in Employee Name/Seat Lookup set");
        }).catch(err => console.log(err));
    }

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
