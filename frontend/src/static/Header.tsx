import NavigationBar from "./NavigationBar";
import "./Header.css"
import {Button, Typography} from "@mui/material";
import {UserProvider} from "../context/UserContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";


export default function Header() {

    const navigate = useNavigate()
    const userContext = useContext(UserProvider)

    function onClick() {
        if (userContext.isLoggedIn) {
            userContext.logout()
            navigate("/")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={require("../ressources/White logo - no background.png")} alt={"Logo"}/>
                <Typography variant={"h5"} style={{textAlign: "center"}} sx={{fontWeight: 80}}>CARE & CONNECT</Typography>
                <Button variant="outlined" type={"button"} onClick={onClick}>{userContext.isLoggedIn ? "Logout" : "Login"}</Button>
            </div>
            <NavigationBar/>
        </div>
    )
}