import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function SaveRoute(avalanche_data) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Forecast Snapshot
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Save Route</Button>
            </CardActions>
            <CardContent>
                <div>
                    <li className="inline mr-2 w-20 h-20 rounded-full bg-red-400">22</li>
                    <li className="inline mx-2 w-20 h-20 rounded-full bg-red-400">23</li>
                    <li className="inline mx-2 w-20 h-20 rounded-full bg-red-400">24</li>
                    <li className="inline mx-2 w-20 h-20 rounded-full bg-red-400">25</li>
                    <li className="inline mx-2 w-20 h-20 rounded-full bg-red-400">26</li>
                </div>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Risk Factors
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Review Danger Levels</Button>
            </CardActions>
            <CardActions>
                <Button size="small">Review Risk Factors</Button>
            </CardActions>
        </Card>
    );
}
