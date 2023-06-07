import {FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SignUpPage.css"
import {UserProvider} from "../context/UserContext";


export default function SignUpPage() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const userContext = useContext(UserProvider)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        userContext.signup(username, password)
            .then(() => {navigate("/")})
    }


    return (
        <div className={"signUpPage"}>
            <form onSubmit={onSubmit}>
                <label>Benutzername: </label>
                <input type={"text"} placeholder={"Benutzername festlegen"} onChange={e => setUsername(e.target.value)}/>
                <label>Passwort: </label>
                <input type={"password"} placeholder={"Passwort festlegen"} onChange={e => setPassword(e.target.value)}/>
                <button type={"submit"}>Benutzer erstellen</button>
            </form>
        </div>
    )
}