import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {determineRiskColor} from "../util"

export default function DangerLevels(props) {

    let dangerRatingDescriptions = [
        {
            name: 1,
            description: "Generally safe avalanche conditions. Watch for unstable snow on isolated terrain features.\n" +
                "\n" +
                "Natural and human-triggered avalanches unlikely.\n" +
                "\n" +
                "Small avalanches in isolated areas or extreme terrain."
        }
        ,
        {
            name: 2,
            description: "Heightened avalanche conditions on specific terrain features. Evaluate snow and terrain carefully; identify features of concern.\n" +
                "\n" +
                "Natural avalanches unlikely; human-triggered avalanches possible.\n" +
                "\n" +
                "Small avalanches in specific areas; or large avalanches in isolated areas."
        }
        ,
        {
            name: 3,
            description: "Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.\n" +
                "\n" +
                "Natural avalanches possible; human-triggered avalanches likely.\n" +
                "\n" +
                "Small avalanches in many areas; or large avalanches in specific areas; or very large avalanches in isolated areas."
        },
        {
            name: 4,
            description: "Very dangerous avalanche conditions. Travel in avalanche terrain not recommended.\n" +
                "\n" +
                "Natural avalanches likely; human-triggered avalanches very likely.\n" +
                "\n" +
                "Large avalanches in many areas; or very large avalanches in specific areas."
        }, {
            name: 5,
            description: "Avoid all avalanche terrain.\n" +
                "\n" +
                "Natural and human-triggered avalanches certain.\n" +
                "\n" +
                "Large to very large avalanches in many areas."
        }]


    return (<div className="absolute right-2 top-2 z-10">
            <Card sx={{minWidth: 400, maxWidth: 600}}>
                <CardContent>
                    <div className={"mb-4 text-xl text-sky-700  font-bold uppercase"}>
                        Danger Levels
                    </div>
                </CardContent>
                <CardContent>
                    <table className={"table-auto"}>
                        <thead className={"my-4"}>
                        <tr className={"py-2"}>
                            <th>Rating</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dangerRatingDescriptions.map(rating =>
                            <tr className={"py-2"}>
                                <td><div className={`m-2 w-20 h-20 p- text-white rounded-full ${determineRiskColor(rating.name)}`}>{rating.name}</div></td>
                                <td className={"text-sm"}>{rating.description}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={() => props.setNext(1)} size="large">Go Back</Button>
                </CardActions>
            </Card>
        </div>
    );
}
