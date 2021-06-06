import React from "react";
import { useCanvas } from "../utils/useCanvas";

function OfficeFloorPlan(props) {
    const [ canvasRef, canvasWidth, canvasHeight ] = useCanvas();

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
                height={canvasHeight} />
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
