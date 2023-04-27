import NavigationBar from "./NavigationBar";
import "./Header.css"
import {Typography} from "@mui/material";
import {UserProvider} from "../context/UserContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";


export default function Header() {

    const navigate = useNavigate()
    const userContext = useContext(UserProvider)

    function onClick() {
        if (userContext.isLoggedIn) {
            userContext.logout()
            navigate("/menu")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={require("../ressources/pngwing.com.png")} alt={"Logo"}/>
                <Typography variant={"h3"} style={{textAlign: "center"}}>Social Intervention Tool</Typography>
                <button type={"button"} onClick={onClick}>{userContext.isLoggedIn ? "Logout" : "Login"}</button>
            </div>
            <NavigationBar/>
        </div>
    )
}