import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GenerateAvalanche from "../generateForecast";
import {determineRiskColor, determineRiskImage} from "../util"
import {useEffect, useRef, useState} from "react";


export default function CompareRoutes(props) {

    let saferSate = 1
    const forecast = useRef(null);

    function determineRiskIcon(forecast, index) {
        if (forecast == null) return;
        let length = forecast.risks.length;
        if (index < length) {
            return determineRiskImage(forecast.risks[index].title)
        }
    }

    if (props.defaultForcast) forecast.current = props.defaultForcast;
    if (forecast.current == null) {
        forecast.current = []
        forecast.current.push(GenerateAvalanche())
        forecast.current.push(GenerateAvalanche())
        props.setCurrentCompareForecast(forecast.current)
    }
    ;

    if (forecast.current[0].danger_rating[0] > forecast.current[1].danger_rating[0]) {
        saferSate = 2;
    }

    useEffect(() => {
        if (props.setExitState){
            props.setExitState(2)
        }
    })


    return (<div className="absolute right-2 top-2 z-10">
            <div className={"grid grid-cols-2 gap-4 "}>
                <Card sx={{minWidth: 250, maxWidth: 500}}>
                    <div className={"grid place-items-center p-4"}>
                        <div className={"font-bold uppercase tracking-wide my-2 text-black"}>
                            Forecast Snapshot
                        </div>
                        <div className={"font-bold uppercase tracking-wide mt-1 mb-2 text-black"}>
                            {forecast.current[0].area}
                        </div>

                            {saferSate === 1 && <div
                                className={"rounded-md w-full my-4 font-bold bg-green-500 text-center text-bold h-6 text-white"}>Safest</div>}
                            {saferSate === 2 && <div
                                className={"rounded-md w-full my-4 font-bold text-center text-bold h-6 text-white"}>Safest</div>}

                    </div>
                    <div className={"border-y-2 px-4 pt-4 grid place-items-center drop-shadow-sm"}>
                        <div className={"text-md text-sky-700 text-center font-bold uppercase"}>
                            Danger Forecast
                        </div>
                            <div className={"my-8"}>
                                <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[0].danger_rating[0])}`}>28</li>
                                <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[0].danger_rating[1])}`}>29</li>
                                <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[0].danger_rating[2])}`}>30</li>
                                <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[0].danger_rating[3])}`}>31</li>
                                <li className={`inline w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[0].danger_rating[4])}`}>01</li>
                        </div>
                    </div>
                        <div className={"grid place-items-center p-4"}>
                        <div className={"my-4 text-md text-sky-700 text-center font-bold uppercase"}>
                            Risk Factors
                        </div>
                        <div className={"mt-2 mb-4 p-2 border-2 bg-white rounded-lg drop-shadow-sm"}>
                            <table className={"table-auto"}>
                                <tbody>
                                <tr key={1}>
                                    <td>{determineRiskIcon(forecast.current[0], 0)}</td>
                                    <td>{determineRiskIcon(forecast.current[0], 1)}</td>
                                </tr>
                                <tr key={2}>
                                    <td>{determineRiskIcon(forecast.current[0], 2)}</td>
                                    <td>{determineRiskIcon(forecast.current[0], 3)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <Button variant="outlined" onClick={() =>{
                            props.setNext(3)
                            props.setAvalancheState(forecast.current[0])}
                            } size="small">Review Risk
                            Factors</Button>
                    </div>

                </Card>
                <Card sx={{minWidth: 250, maxWidth: 500}}>
                    <div className={"grid place-items-center p-4"}>
                        <div className={"font-bold uppercase tracking-wide my-2 text-black"}>
                            Forecast Snapshot
                        </div>
                        <div className={"font-bold uppercase tracking-wide mt-1 mb-2 text-black"}>
                            {forecast.current[1].area}
                        </div>

                        {saferSate === 2 && <div
                            className={"rounded-md w-full my-4 font-bold bg-green-500 text-center text-bold h-6 text-white"}>Safest</div>}
                        {saferSate === 1 && <div
                            className={"rounded-md w-full my-4 font-bold text-center text-bold h-6 text-white"}>Safest</div>}

                    </div>
                    <div className={"border-y-2 px-4 pt-4 grid place-items-center drop-shadow-sm"}>
                        <div className={"text-md text-sky-700 text-center font-bold uppercase"}>
                            Danger Forecast
                        </div>
                        <div className={"my-8"}>
                            <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[1].danger_rating[0])}`}>28</li>
                            <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[1].danger_rating[1])}`}>29</li>
                            <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[1].danger_rating[2])}`}>30</li>
                            <li className={`inline mr-2 w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[1].danger_rating[3])}`}>31</li>
                            <li className={`inline w-20 h-20 p-2 text-white rounded-full ${determineRiskColor(forecast.current[1].danger_rating[4])}`}>01</li>
                        </div>
                    </div>
                    <div className={"grid place-items-center p-4"}>
                        <div className={"my-4 text-md text-sky-700 text-center font-bold uppercase"}>
                            Risk Factors
                        </div>
                        <div className={"mt-2 mb-4 p-2 border-2 bg-white rounded-lg drop-shadow-sm"}>
                            <table className={"table-auto"}>
                                <tbody>
                                <tr key={1}>
                                    <td>{determineRiskIcon(forecast.current[1], 0)}</td>
                                    <td>{determineRiskIcon(forecast.current[1], 1)}</td>
                                </tr>
                                <tr key={2}>
                                    <td>{determineRiskIcon(forecast.current[1], 2)}</td>
                                    <td>{determineRiskIcon(forecast.current[1], 3)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <Button variant="outlined" onClick={() => {
                            props.setNext(3)
                            props.setAvalancheState(forecast.current[1])
                        }} size="small">Review Risk
                            Factors</Button>
                    </div>

                </Card>
            </div>
        </div>
    );
}
