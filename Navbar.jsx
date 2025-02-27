/*import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';
import { Logout } from './Logout';

export const Navbar = () => {
    const buttonStyles = {
        marginRight: '20px',
        fontSize: '1.2rem',
        padding: '0.3rem 1.4rem',
        backgroundColor:"white",
        color:"purple"
    }

    return (
        <AppBar sx={{  backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
            "&:hover": { backgroundImage: "linear-gradient(to right, #2575fc, #6a11cb)" }  }}>

            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 ,fontFamily: 'Playfair Display',fontWeight: "bold"}}>SUB-Manage</Typography>
                <Button sx={buttonStyles} variant="contained" to="/signup" component={Link}>Signup</Button>
                <Button sx={buttonStyles} variant="contained" to="/login" component={Link}>Login</Button>
                <Logout />
            </Toolbar>
        </AppBar>
    );
};*/
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';
import { Logout } from './Logout';

export const Navbar = () => {
    const location = useLocation();
    const hideButtons = location.pathname === "/random"; // Hide buttons only on /random

    const buttonStyles = {
        marginRight: '20px',
        fontSize: '1.2rem',
        padding: '0.3rem 1.4rem',
        backgroundColor: "white",
        color: "purple",
        "&:hover": { backgroundColor: "#f0f0f0" }
    };

    return (
        <AppBar 
            sx={{  
                backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
                "&:hover": { backgroundImage: "linear-gradient(to right, #2575fc, #6a11cb)" }  
            }}
        >
            <Toolbar>
                <Typography 
                    variant="h4" 
                    sx={{ flexGrow: 1, fontFamily: 'Playfair Display', fontWeight: "bold" }}
                >
                    SUB-Manage
                </Typography>
                
                {!hideButtons && (
                    <>
                        <Button sx={buttonStyles} variant="contained" to="/signup" component={Link}>Signup</Button>
                        <Button sx={buttonStyles} variant="contained" to="/login" component={Link}>Login</Button>
                        <Logout />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
