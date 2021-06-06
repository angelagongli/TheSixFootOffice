// From React: Creating an Interactive Canvas Component on medium.com
import React, { useState, useEffect, useRef } from "react";

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .5;
export const canvasHeight = window.innerHeight * .5;

export function drawSeat(context, seat) {
    context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect(10, 10, 50, 50);
    context.fillStyle = 'rgba(0, 0, 200)';
    context.fillRect(30, 30, 50, 50);
}

export function useCanvas() {
    const canvasRef = useRef(null);
    const [seatCoordinates, setSeatCoordinates] = useState([]);

    useEffect(()=>{
        const canvasObject = canvasRef.current;
        const context = canvasObject.getContext('2d');
        context.clearRect( 0, 0, canvasWidth, canvasHeight );
        seatCoordinates.forEach((seat)=>{drawSeat(context, seat)});
    });

    return [ canvasRef, canvasWidth, canvasHeight ];
}
