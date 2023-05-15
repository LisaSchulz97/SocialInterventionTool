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
            navigate("/menu")
        } else {
            navigate("/login")
        }
    }
    console.log(userContext.currentUser)

    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={require("../ressources/kisspng-avenue-dental-care-team-company-innovation-organiz-people-icon-5abd937528af80.5052767615223734931667.png")} alt={"Logo"}/>
                <Typography variant={"h5"} style={{textAlign: "center"}} sx={{fontWeight: 80}}>Social Intervention Tool</Typography>
                <Button variant="outlined" type={"button"} onClick={onClick}>{userContext.isLoggedIn ? "Logout" : "Login"}</Button>
            </div>
            <NavigationBar/>
        </div>
    )
}