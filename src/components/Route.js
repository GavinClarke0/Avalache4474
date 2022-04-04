import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PouchDB from "pouchdb";
import GenerateAvalanche from "../generateForecast"
import {determineRiskColor, determineRiskImage} from "../util"

import cameraSuccess from "../assets/icons/icons8-camera-100-green.png"
import cameraFailure from "../assets/icons/icons8-camera-100.png"
import cameraNormal from "../assets/icons/icons8-camera-100-black.png"
import {useEffect, useRef, useState} from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

var db = new PouchDB('routes_1');
let savedRoute = false;
let failedSave = false;

export default function SaveRoute(props) {

    function saveRoute() {
        let newId = 0

        // if (savedRoute) return;
        db.allDocs({
            include_docs: true,
            attachments: true
        }).then(function (result) {
            result.rows.forEach((row, i) => {
                let doc = row.doc
                if (doc.route_num > newId) {
                    newId = doc.route_num
                }
                ;
            });
            newId++;
            db.put({
                _id: newId.toString(),
                route_num: newId,
                area: forecast.current.area,
                coords: props.route.coordinates,
                forecast: forecast.current

            })
            setSaveState(<img className={"mx-auto w-12"} src={cameraSuccess}/>)
            savedRoute = true;
            setDisableSave(true)

        }).catch(function (err) {
            failedSave = true;
            setSaveState(<img className={"mx-auto w-12"} src={cameraFailure}/>)
            console.log(err);
        });
    }

    function determineRiskIcon(index) {
        if (!forecast) return;
        let length = forecast.current.risks.length;
        if (index < length) {
            return determineRiskImage(forecast.current.risks[index].title)
        }
    }

    useEffect(() => {
        props.setAvalancheState(forecast.current)

        if (props.setExitState){
            props.setExitState(1)
        }

    })
    const [saveState, setSaveState] = useState(<img className={"mx-auto w-12"} src={cameraNormal}/>);
    const [disableSave, setDisableSave] = useState(false)
    const forecast = useRef(null);

    if (props.defaultForecast != null) forecast.current = props.defaultForecast;
    if (forecast.current == null) {
        forecast.current = GenerateAvalanche()
    }

    return (<div className="absolute text-lg right-2 top-2 z-10">
            <Card sx={{minWidth: 275, maxWidth: 500}}>
                <div className={"p-4 grid place-items-center"}>
                    <div className={"text-center font-bold uppercase tracking-wide my-1 text-black"}>
                        {forecast.current.area}
                    </div>
                    <div className={"my-2"}>
                        {saveState}
                    </div>
                    <Button variant="outlined" disabled={ disableSave || props.preSaved} onClick={saveRoute} size="small">Save Route</Button>
                </div>
                <div className={"border-y-2 p-4 grid place-items-center drop-shadow-sm"}>
                    <div className={"text-md text-sky-700 text-center font-bold uppercase"}>
                        Danger Forecast
                    </div>
                    <div className={"my-8"}>
                        <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current.danger_rating[0])}`}>28</li>
                        <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current.danger_rating[1])}`}>29</li>
                        <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current.danger_rating[2])}`}>30</li>
                        <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current.danger_rating[3])}`}>31 </li>
                        <li className={`inline w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current.danger_rating[4])}`}>01 </li>
                    </div>
                    <Button variant="outlined" onClick={() => props.setNext(4)} size="small">Review Danger
                        Levels</Button>
                </div>
                <div className={"p-4 grid place-items-center"}>
                    <div className={"mb-4 text-md text-sky-700 text-center font-bold uppercase"}>
                        Risk Factors
                    </div>
                    <div className={"my-2 mb-8 border-2 bg-white p-4 rounded-lg drop-shadow-sm"}>
                        <table className={"table-auto"}>
                            <tbody>
                            <tr key={1}>
                                <td>{determineRiskIcon(0)}</td>
                                <td>{determineRiskIcon(1)}</td>
                            </tr>
                            <tr key={2}>
                                <td>{determineRiskIcon(2)}</td>
                                <td>{determineRiskIcon(3)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <Button variant="outlined" onClick={() => props.setNext(3)} size="small">Review Risk
                        Factors</Button>
                </div>
            </Card>
        </div>
    );
}
