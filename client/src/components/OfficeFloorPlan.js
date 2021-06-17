import React, { useState, useEffect } from "react";
import { useCanvas } from "../utils/useCanvas";

function OfficeFloorPlan(props) {
    const [canvasRef, canvasWidth, canvasHeight] = useCanvas();
    const [seatCoordinates, setSeatCoordinates] = useState([]);
    const firstSeatUpperLeftX = 300;
    const firstSeatUpperLeftY = 50;
    const seatWidth = 150;
    const seatHeight = 120;
    const officeFloorPlanKeyEntryArr = [
        {
            inOfficeRequirement: "In Office AM",
            colorBlockFill: "rgba(200, 0, 0, 0.66)"
        },
        {
            inOfficeRequirement: "In Office PM",
            colorBlockFill: "rgba(0, 0, 200, 0.66)"
        },
        {
            inOfficeRequirement: "In Office All Day",
            colorBlockFill: "rgba(200, 0, 200, 0.66)"
        },
        {
            inOfficeRequirement: "Home",
            colorBlockFill: "rgba(0, 0, 0, 0.33)"
        }
    ];

    useEffect(() => {
        computeSeatMapping();
    }, []);

    const handleCanvasClick=(event)=>{
        const x = event.nativeEvent.offsetX
        const y = event.nativeEvent.offsetY;
        console.log(`x: ${x}, y: ${y}`);
        let chosenSeatNumber = seatCoordinates.findIndex(seat => {
            let dx = x - seat.upperLeftX;
            let dy = y - seat.upperLeftY;
            return dx > 0 && dx < seatWidth && dy > 0 && dy < seatHeight;
        }) + 1;
        console.log(`Seat Number ${chosenSeatNumber}: ${JSON.stringify(seatCoordinates[chosenSeatNumber - 1])}`);
        if (chosenSeatNumber && props.employeesAll.find(employee => employee.seatNumber === chosenSeatNumber)) {
            props.chooseSeat(chosenSeatNumber);
        }
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

    return (
        <div>
            <h5>
                All Employees in the Office Today
            </h5>
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
            <div className="officeFloorPlanCanvasContainer">
                <canvas id="OfficeFloorPlanCanvas" ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    onClick={handleCanvasClick} />
                <div className="officeFloorPlanKey">
                    <h6>
                        Office Floor Plan Key
                    </h6>
                    {officeFloorPlanKeyEntryArr.map((officeFloorPlanKeyEntry, index) => (
                        <div key={index} className="officeFloorPlanKeyEntry">
                            <svg className="officeFloorPlanKeyEntryColorBlock" width="20" height="20">
                                <rect width="20" height="20" style={{fill: officeFloorPlanKeyEntry.colorBlockFill}} />
                            </svg>
                            <span>
                                {officeFloorPlanKeyEntry.inOfficeRequirement}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OfficeFloorPlan;
