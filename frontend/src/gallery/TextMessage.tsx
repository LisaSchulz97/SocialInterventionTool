import {Questionnaire} from "../model/questionnaire";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {Grid, Typography} from "@mui/material";
import "./TextMessage.css";

export default function TextMessage() {
    const context = useContext(QuestionnaireProvider)

    return (

        <div className={"TextContainer"}>
            <Typography variant="h4" gutterBottom>
                Super, Sie haben alles ausgefüllt.
            </Typography>
            <Typography variant="h4" gutterBottom>
                Merken Sie sich diese Zahl:
            </Typography>
            <Typography variant="h2" gutterBottom>
                {context.currentQuestionnaire.id}
            </Typography>
        </div>

    );
}