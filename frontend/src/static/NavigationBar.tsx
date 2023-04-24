import {NavLink} from "react-router-dom";
import "./NavigationBar.css"

export default function NavigationBar() {
    return (
        <div className={"NavigationBar"}>
            <NavLink className={"NavigationItem"} to={"/menu"}>Alle Organisationen</NavLink>
            <NavLink className={"NavigationItem"} to={"/result"}>Ergebnis Patient</NavLink>
        </div>
    )

}


