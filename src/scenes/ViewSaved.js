
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import React, { useRef, useEffect, useState } from 'react';

import Route from '../components/Route'
import DangerLevels from "../components/DangerLevels";
import RiskFactors from "../components/RiskFactors";
import CompareRoutes from "../components/RouteCompare";

import PaintRoute from "../components/PaintRoute"
import SavedRoutes from "../components/SavedRoutes";
import Button from "@mui/material/Button";
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2F2aW5jbGFya2UwIiwiYSI6ImNsMHlibm9mZDBnZm8zaXBqMHcxajJ0em4ifQ.HHRfRI_7Ix71cYVlR52hfA'

export default function SavedRoutesView(props) {


    const [saveState, setSaveState] = useState(0);
    const [currentForecast, setCurrentForecast] = useState(null);
    const [currentCompareForecast, setCurrentCompareForecast] = useState(null);
    const [avalancheState, setAvalancheState] = useState(null);
    const [exitState, setExitState] = useState(0);
    // {saveState === 1 && <PaintRoute props={routeData}/>}
    return (
        <div>
            <div className={"absolute left-2 top-2 z-10"}>
                <Button variant="contained" onClick={() =>  props.setSelection(0)} size="small">Exit</Button>
            </div>
            {saveState === 0 && <SavedRoutes setCurrentForecast={setCurrentForecast} setCurrentCompareForecast={setCurrentCompareForecast} setNext={setSaveState} />}
            {saveState === 2 && <CompareRoutes defaultForcast={currentCompareForecast} setNext={setSaveState} setAvalancheState={setAvalancheState} setExitState={setExitState}/>}
            {saveState === 1 && <Route preSaved={true} defaultForecast={currentForecast} setNext={setSaveState} setAvalancheState={setAvalancheState} setExitState={setExitState}/>}
            {saveState === 3 && <RiskFactors setNext={setSaveState} risks={avalancheState} exitScreen={exitState}/>}
            {saveState === 4 && <DangerLevels setNext={setSaveState}/>}
        </div>
    );
}











