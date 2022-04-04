import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import {useEffect, useState} from "react";

import PouchDB from "pouchdb";

var db = new PouchDB('routes_1')

export default function SavedRoutes(props) {

    const [message, setMessage] = useState("Select At Least 1 Route To Compare")
    const [routes, setRoutes] = useState([])
    const [selectedRoutes, setSelectedRoutes] = useState(new Set())
    const [disableCompare, setDisableCompare] = useState(true)

    useEffect(() => {
        getSaved();
    }, []);

    const getSaved = async () => {

        let newRoutes = []

        let result = await db.allDocs({
            include_docs: true,
            attachments: true
        })

        result.rows.forEach((row, i) => {
            let doc = row.doc
            newRoutes.push(doc)
        });
        setRoutes(newRoutes)
    }


    routes.map(route => selectedRoutes[route.route_num] = false)

    function selectRoute(id) {
        if (selectedRoutes.has(id)){
            selectedRoutes.delete(id)
            setSelectedRoutes(selectedRoutes)
        } else {
            selectedRoutes.add(id)
            setSelectedRoutes(selectedRoutes)
        }

        if(selectedRoutes.size === 1 ){
            if (disableCompare){
                setDisableCompare(false)
            }
            setMessage( "View Route")
        } else if (selectedRoutes.size === 2){

            if (disableCompare){
                setDisableCompare(false)
            }
            setMessage("Compare Selected Routes")
        } else if (selectedRoutes.size === 0){
            setMessage( "Select At Least 1 Route To Compare")
            setDisableCompare(true)
        } else {
            setMessage( "Cannot Compare Greater Than 2 Routes")
            setDisableCompare(true)
        }
    }

    function viewOrCompare() {
        if (selectedRoutes.size === 2){
            let currentForecastIdIterator = selectedRoutes.values();
            let currentForecastId1 = currentForecastIdIterator.next().value
            let currentForecastId2 = currentForecastIdIterator.next().value

            let currentForecast = [];

            for (let item of routes){
                if (item.route_num === currentForecastId1 || item.route_num === currentForecastId2) currentForecast.push( item);
            }
            props.setCurrentCompareForecast([currentForecast[0].forecast, currentForecast[1].forecast])
            props.setNext(2)

        } else if (selectedRoutes.size === 1) {

            let currentForecastId = selectedRoutes.values().next().value;
            let currentForecast;

            for (let item of routes){
                if (item.route_num === currentForecastId) currentForecast = item;
            }
            props.setCurrentForecast(currentForecast.forecast)
            props.setNext(1)
        }
    }

    function determineRiskColor(risk){
        switch(risk) {
            case 1:
                return "bg-green-500"
                break;
            case 2:
                return "bg-yellow-400"
                break;
            case 3:
                return "bg-orange-500"
                break;
            case 4:
                return "bg-red-700"
                break;
            case 5:
                return "bg-black"
                break;
            default:
                return "bg-white"
        }
    }


    return (<div className="absolute right-2 top-2 z-10">
            <Card sx={{ minWidth: 400, maxWidth: 600}}>
                <CardContent>
                    <div className={"mb-4 text-xl text-sky-700  font-bold uppercase"}>
                        Routes
                    </div>
                </CardContent>
                <CardContent>
                    <table className={"table-fixed space-y-2"} >
                        <thead className={"my-4 border-b-2"}>
                            <tr className={"my-4"}>
                                <th className={"mb-4 text-md text-sky-700 px-4 font-bold"}>Route #</th>
                                <th className={"mb-4 text-md text-sky-700 px-4  font-bold"}>Area</th>
                                <th className={"mb-4 text-md text-sky-700 px-4  font-bold"}>Danger Rating</th>
                                <th className={"mb-4 text-md text-sky-700 px-4  font-bold"}>Selected</th>
                            </tr>
                        </thead>
                        <tbody className={"my-4 border-b-2"}>
                        {routes.map(route =>
                            <tr
                                key={route.route_num}
                                className={`my-2`}>
                                <td className={"p-2 font-bold text-center"}>{route.route_num}</td>
                                <td className={"p-2 text-center"} >{route.area}</td>
                                <td className={"p-2 flex justify-center items-center "} >
                                    <div className={`mr-2 w-10 h-10 p-1 text-white drop-shadow-sm rounded-full ${determineRiskColor(route.forecast.danger_rating[0])}`}/>
                                </td>
                                <td className="p-2">
                                    <Checkbox onClick={() => selectRoute(route.route_num)}/>
                                </td>
                            </tr>
                         )}
                        </tbody>
                    </table>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" disabled={disableCompare} onClick={() =>viewOrCompare()} size="large">{message}</Button>
                </CardActions>
            </Card>
        </div>
    );
}
