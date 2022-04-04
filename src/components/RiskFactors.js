import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {determineRiskImage} from "../util";






export default function RiskFactors(props) {

    const riskFactors = props.risks.risks

    return (<div className="absolute right-2 top-2 z-10">
            <Card sx={{ minWidth: 400, maxWidth: 700}}>
                <CardContent>
                    <div className={"mb-4 text-xl text-sky-700  font-bold uppercase"}>
                        Risk Factors
                    </div>
                    <table className={"table-auto"} >
                        <thead className={"my-4"}>
                        <tr>
                            <th/>
                            <th className={"p-1"}>Risk</th>
                            <th className={"p-1"}>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {riskFactors.map(route =>
                            <tr className={"w-20 h-20"}  key={route.title}>
                                <td className={"w-20 h-20"}> {determineRiskImage(route.title)}</td>
                                <td className={"p-1"}>{route.title}</td>
                                <td className={"p-1"}>{route.description}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={ () => props.setNext(props.exitScreen)}  size="large">Go Back</Button>
                </CardActions>
            </Card>
        </div>
    );
}
