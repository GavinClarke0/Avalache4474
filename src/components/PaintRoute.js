import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useRef, useEffect, useState } from 'react';


export default function PaintRoute(props) {

    let cords = props.props.coordinates
    const canvas = useRef();
    let ctx = null;



    // initialize the canvas context
    useEffect(() => {
        // dynamically assign the width and height to canvas
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;

        // get context of the canvas
        ctx = canvasEle.getContext("2d");
    }, []);


    const drawLine = (info, style = {}) => {
        const { x, y, x1, y1 } = info;
        const { color = 'black', width = 1 } = style;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }

    useEffect(() => {
        for (let i = 1; i < cords.length; i++) {
            let point1 = cords[i-1]
            let point2 = cords[i]
            let X1 = point1[0]
            let X2 = point2[0]
            let Y1 = point1[1]
            let Y2 = point2[1]
            drawLine({ x: X1, y: Y1, x1: X2, y1: Y2 }, { color: 'red' });
        }
    }, []);

    return (
        <div className="max-w-2xl">
            <canvas ref={canvas}></canvas>
        </div>
    );
}
