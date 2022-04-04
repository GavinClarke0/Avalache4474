
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import React, { useRef, useEffect, useState } from 'react';

import Route from '../components/Route'
import DangerLevels from "../components/DangerLevels";
import RiskFactors from "../components/RiskFactors";
import CompareRoutes from "../components/RouteCompare";

import PaintRoute from "../components/PaintRoute"
import Button from "@mui/material/Button";
import Instruction from "../components/Instruction";

let routeDataFirst;
let routeDataSecond;
let activeLayerIds = []

export default function CompareDrawRoute(props) {

    let map = props.map
    const [drawState, setDrawState] = useState(0);
    const [instructionState, setInstructionState] = useState(0);
    const draw = useRef(null);
    const routeState  = useRef(1);
    const [currentCompareForecast, setCurrentCompareForecast] = useState(null);
    const [avalancheState, setAvalancheState] = useState(null);

    function exit(){
        if (map.current){
            for (const layer of activeLayerIds) {
                map.current.removeLayer(layer);
                map.current.removeSource(layer);
            }
            activeLayerIds = []
        }
        if (draw.current != null) {
            map.current.removeControl(draw.current);
            map.current.off('draw.create', finished);
        }

        draw.current = null;
        routeState.current = 1;
        props.setSelection(0)
    }

    // function that changes to route value after drawing finishes
    const finished = () => {
        if (routeState.current === 1) {
            const data = draw.current.getAll();
            routeDataFirst = data.features[0].geometry

            // paints route on map
            map.current.addSource('route1', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': data.features[0].geometry
                }
            })
            map.current.addLayer({
                'id': 'route1',
                'type': 'line',
                'source': 'route1',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#002cff',
                    'line-width': 2
                }
            })
            activeLayerIds.push('route1')
            setInstructionState(2)
            routeState.current = 2
            return
        }

        if (routeState.current === 2) {
            const data = draw.current.getAll();
            routeDataSecond = data.features[1].geometry

            // paints route on map
            map.current.addSource('route2', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': data.features[1].geometry
                }
            })
            map.current.addLayer({
                'id': 'route2',
                'type': 'line',
                'source': 'route2',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#ff0000',
                    'line-width': 2
                }
            });

            map.current.removeControl(draw.current);
            map.current.off('draw.create', finished);
            draw.current = null;
            activeLayerIds.push('route2')
            setDrawState(2)
        }
    }

    useEffect(() => {
        if (!map.current || routeState.current !== 1||draw.current ) return;

        draw.current = new MapboxDraw({
            displayControlsDefault: false,

            controls: {
                line_string: true

            },
            defaultModeL:  'draw_point'
        });

        map.current.addControl(draw.current, 'bottom-left');
        map.current.on('draw.create',finished);
    })

    return (
        <div>
            <div className={"absolute left-2 top-5 z-10"}>
                <Button variant="contained" onClick={exit} size="small">Exit</Button>
            </div>
            {instructionState === 0 &&  <Instruction message={"Click the draw icon in the lower left to begin drawing, double click to stop"}/>}
            {drawState === 0 && instructionState !== 0 &&   <Instruction message={"For the 2nd route click the draw icon again to begin drawing, double click to stop"}/>}
            {drawState === 2 && <CompareRoutes setCurrentCompareForecast={setCurrentCompareForecast} setNext={setDrawState} setAvalancheState={setAvalancheState} defaultForcast={currentCompareForecast}/>}
            {drawState === 3 && <RiskFactors setNext={setDrawState} risks={avalancheState} exitScreen={2}/>}
        </div>
    );
}











