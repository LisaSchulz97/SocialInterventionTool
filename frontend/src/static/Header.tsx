import NavigationBar from "./NavigationBar";
import "./Header.css"
import {Typography} from "@mui/material";


export default function Header() {
    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={require("../ressources/pngwing.com.png")} alt={"Logo"}/>
                <Typography variant={"h3"} style={{textAlign: "center"}}>Social Intervention Tool</Typography>
            </div>
            <NavigationBar/>
        </div>
    )
}