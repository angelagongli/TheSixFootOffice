// From React: Creating an Interactive Canvas Component on medium.com
import React, { useEffect, useRef } from "react";

export function useCanvas() {
    const canvasRef = useRef(null);

    useEffect(()=>{
        const canvasObject = canvasRef.current;
        const context = canvasObject.getContext('2d');
    });

    return canvasRef;
}
