import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export default function BasicMenu(props) {

    //console.log(props)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (i) => {
        console.log(i)
        props.setSelection(i)
        setAnchorEl(null);
    };

    return (
        <div className="absolute right-2 top-2 z-10">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
            >
                Calculate
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClose(1)}>Draw New Route</MenuItem>
                <MenuItem onClick={() => handleClose(2)}>Draw And Compare Routes</MenuItem>
                <MenuItem onClick={() => handleClose(3)}>View Saved Routes</MenuItem>
            </Menu>
        </div>
    );
}
