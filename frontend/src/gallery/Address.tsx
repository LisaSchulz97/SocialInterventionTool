import React, {ChangeEvent, FormEvent, useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {Button, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import "./Address.css";


export default function Address() {
    const context = useContext(QuestionnaireProvider)
    const navigate = useNavigate()


    function onInputChange(event: ChangeEvent<HTMLInputElement>) {
        context.setCurrentQuestionnaire({...context.currentQuestionnaire, [event.target.name]: event.target.value})
    }


    function onSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        context.post(context.currentQuestionnaire)
        navigate("text")
    }


    return (

        <div>
            <form onSubmit={onSave}>
                <div className={"TextContainerAddress"}>
                <Typography variant="h6" sx={{fontWeight: 80}} gutterBottom>
                    Falls Ihr Ergebnis zu dem Vorschlag von Beratungsstellen führt, können Sie hier OPTIONAL Ihre
                    Adresse eingeben,
                    damit Ihnen dann nur Beratungsstellen in Ihrer Umgebung angezeigt werden
                </Typography>
                </div>
                <div className={"InputContainerAddress"}>
                <TextField value={context.currentQuestionnaire.street_and_number} name={"street_and_number"}
                           onChange={onInputChange} label="Straße und Hausnummer" id="outlined-basic" color="success"
                           sx={{width: "60%"}} variant="outlined"/>
                <TextField value={context.currentQuestionnaire.plz} name={"plz"} onChange={onInputChange}
                           label="Postleitzahl" id="outlined-basic" color="success" sx={{width: "60%"}}
                           variant="outlined"/>
                </div>
                <div className={"ButtonContainerAddress"}>
                <Button type={"submit"}>Speichern</Button>
                <Button type={"submit"}>Überspringen</Button>
                </div>
            </form>
        </div>

    );
}