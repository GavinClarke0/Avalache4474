import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import React, { useRef, useEffect, useState } from 'react';

import Route from '../components/Route'
import DangerLevels from "../components/DangerLevels";
import RiskFactors from "../components/RiskFactors";

import Instruction from "../components/Instruction"
import Button from "@mui/material/Button";
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2F2aW5jbGFya2UwIiwiYSI6ImNsMHlibm9mZDBnZm8zaXBqMHcxajJ0em4ifQ.HHRfRI_7Ix71cYVlR52hfA'


let activeLayerIds = []

export default function DrawRoute(props) {

    let map = props.map

    const [drawState, setDrawState] = useState(0);
    const [avalancheState, setAvalancheState] = useState(null);
    const draw = useRef(null);
    const routeData = useRef( []);

    // function to call on exit of draw mode
    function exit(){
        if (map.current != null){
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
        props.setSelection(0)
    }

    // upon finish event remove option to draw and set new state
    function finished() {

        const data = draw.current.getAll();
        routeData.current = data.features[0].geometry

        // paints route on map
        map.current.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': data.features[0].geometry
            }
        })
        map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#888',
                'line-width': 2
            }
        });
        activeLayerIds.push('route')
        map.current.removeControl(draw.current);
        map.current.off('draw.create', finished);
        draw.current = null;
        setDrawState(1)
    }

    // function that changes to route value after drawing finishes
    useEffect(() => {
        if (!map.current || drawState !== 0 || draw.current) return;

        draw.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
               line_string: true
            },
            defaultModeL:  'draw_point'
        });
        map.current.addControl(draw.current, 'bottom-left');
        map.current.on('draw.create', finished);
    })

    return (
        <div>
            <div className={"absolute left-2 top-2 z-10"}>
                <Button variant="contained" onClick={exit} size="small">Exit</Button>
            </div>
            {drawState === 0 &&  <Instruction message={"Click the draw icon in the lower left to begin drawing, double click to stop"}/>}
            {drawState === 1 && <Route preSaved={false} defaultForecast={avalancheState} setNext={setDrawState} route={routeData.current} setAvalancheState={setAvalancheState}/>}
            {drawState === 3 && <RiskFactors setNext={setDrawState} risks={avalancheState} exitScreen={1} />}
            {drawState === 4 && <DangerLevels setNext={setDrawState} exitScreen={1}/>}
        </div>

    );
}










