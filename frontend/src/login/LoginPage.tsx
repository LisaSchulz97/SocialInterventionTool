import {FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserProvider} from "../context/UserContext";

export default function LoginPage() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const userContext = useContext(UserProvider)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        userContext.login(username, password)
            .then(() => {navigate("/menu")})
    }


    return (
        <div className={"LoginPage"}>
            <form onSubmit={onSubmit}>
                <label>Benutzername: </label>
                <input type={"text"} placeholder={"Benutzername eingeben"} onChange={e => setUsername(e.target.value)}/>
                <label>Passwort: </label>
                <input type={"password"} placeholder={"Passwort eingeben"} onChange={e => setPassword(e.target.value)}/>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    )
}