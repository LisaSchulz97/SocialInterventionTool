import NavigationBar from "./NavigationBar";
import "./Header.css"


export default function Header() {
    return (
        <div className={"Header"}>
            <div className={"HeaderContainer"}>
                <img src={require("../ressources/pngwing.com.png")} alt={"Logo"}/>
                <h1>Social Intervention Tool</h1>
            </div>
            <NavigationBar/>
        </div>
    )
}