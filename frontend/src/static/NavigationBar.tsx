import {useNavigate} from 'react-router-dom';
import {Tabs, Tab, Box} from '@mui/material';
import React, {useContext, useState} from "react";
import "./NavigationBar.css";
import {UserProvider} from "../context/UserContext";

export default function NavigationBar() {
    const context = useContext(UserProvider)
    const [value, setValue] = useState(0);
    const navigate = useNavigate()

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };



    return (
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                <Tab label="Alle Organisationen" onClick={() => navigate("/")} sx={{flexGrow: 1}}/>
                <Tab label="Ergebnis Patient" onClick={() => navigate("/result")} sx={{flexGrow: 1}}/>
                {
                    context.isAdmin &&
                    <Tab label="neue Beratungsstelle hinzufügen" onClick={() => navigate("/add")}
                         sx={{flexGrow: 1, width: '100%'}}/>
                }
                {
                    context.isAdmin &&
                    <Tab label="neuen Account erstellen" onClick={() => navigate("/signup")}
                         sx={{flexGrow: 1, width: '100%'}}/>

                }
            </Tabs>
        </Box>
    );
}
