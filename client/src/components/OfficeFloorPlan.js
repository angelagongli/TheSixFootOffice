import React, { useState, useEffect } from "react";
import { useCanvas } from "../utils/useCanvas";

function OfficeFloorPlan(props) {
    const [canvasRef, canvasWidth, canvasHeight] = useCanvas();
    const [seatCoordinates, setSeatCoordinates] = useState([]);
    const firstSeatUpperLeftX = 300;
    const firstSeatUpperLeftY = 50;
    const seatWidth = 150;
    const seatHeight = 120;

    useEffect(() => {
        computeSeatMapping();
    }, []);

    const handleCanvasClick=(event)=>{
        const x = event.nativeEvent.offsetX
        const y = event.nativeEvent.offsetY;
        console.log(`x: ${x}, y: ${y}`);
    }

    function computeSeatMapping() {
        let seatCoordinates = [];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                seatCoordinates.push({
                    upperLeftX: firstSeatUpperLeftX + (i * seatWidth),
                    upperLeftY: firstSeatUpperLeftY + (j * seatHeight),
                })
            }
        }
        setSeatCoordinates(seatCoordinates);
    }

    return (
        <div>
            <map name="OfficeFloorPlanMap">
                <area shape="rect" coords="440, 55, 620, 190"
                    href="/#/seat/1" onClick={() => props.chooseSeat(1)}
                    target="_self" alt="SeatNumber1" />
                <area shape="rect" coords="620, 55, 800, 190"
                    href="/#/seat/2" onClick={() => props.chooseSeat(2)}
                    target="_self" alt="SeatNumber2" />
                <area shape="rect" coords="800, 55, 970, 190"
                    href="https://github.com/angelagongli/TheSixFootOffice/blob/main/README.md"
                    target="_blank" alt="SeatNumber3" />
            </map>
            <img useMap="#OfficeFloorPlanMap"
                src="https://raw.githubusercontent.com/angelagongli/TheSixFootOffice/main/Office_FloorPlan.png"
                alt="Office Floor Plan" />
            <canvas id="OfficeFloorPlanCanvas" ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                onClick={handleCanvasClick} />
            {props.inOfficeEmployeesAll.length && Object.entries(props.inOfficeLookUp).length ?
            props.inOfficeEmployeesAll.map(employee => (
                <div key={employee.id}>
                    {employee.name} sits in Seat Number {employee.seatNumber}: {props.inOfficeLookUp[employee.id]}
                </div>
            ))
            : ""}
        </div>
    );
}

export default OfficeFloorPlan;
