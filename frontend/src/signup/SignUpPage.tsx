import {FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SignUpPage.css"
import {UserProvider} from "../context/UserContext";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";


export default function SignUpPage() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const userContext = useContext(UserProvider)

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        userContext.signup(username, password)
            .then(() => navigate("/qr"))
    }


    return (
        <div className={"signUpPage"}>
            <form onSubmit={onSubmit}>
                <label>Benutzername: </label>
                <TextField type={"text"} placeholder={"Benutzername festlegen"} onChange={e => setUsername(e.target.value)}/>
                <label>Passwort: </label>
                <TextField type={"password"} placeholder={"Passwort festlegen"} onChange={e => setPassword(e.target.value)}/>
                <Button variant="outlined" type={"submit"} style={{ marginLeft: "20px" }}>Benutzer erstellen</Button>
            </form>
        </div>
    )
}