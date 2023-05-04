import {FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserProvider} from "../context/UserContext";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

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
                <br/>
                <label>Benutzername: </label>
                <TextField type={"text"} placeholder={"Benutzername eingeben"} onChange={e => setUsername(e.target.value)}/>
                <label>Passwort: </label>
                <TextField type={"password"} placeholder={"Passwort eingeben"} onChange={e => setPassword(e.target.value)}/>
                <Button type={"submit"}>Login</Button>
            </form>
        </div>
    )
}