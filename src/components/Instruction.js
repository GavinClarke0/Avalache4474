import * as React from "react";
import Paper from '@mui/material/Paper';

export default function Instruction(props) {
    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-2 z-10">
            <Paper variant="outlined">
                <div className={"text-gray text-sm px-2 py-1"}>
                    {props.message}
                </div>
            </Paper>
        </div>
    );
}
