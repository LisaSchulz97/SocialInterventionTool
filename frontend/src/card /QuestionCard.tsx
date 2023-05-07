import {Question} from "../model/question";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

type QuestionCardProps = {
    question: Question
}

export default function QuestionCard(props: QuestionCardProps) {

    const context = useContext(QuestionnaireProvider)
    const navigate = useNavigate()



    return (
        <div className={"QuestionContainer"}>
            <div className={"QuestionCard"}>
                <div className={"QuestionText"}>
                    <h3>{props.question.poll}</h3>
                </div>
                <div>
                    <Button>Ja</Button>
                    <Button>Nein</Button>
                </div>
            </div>
        </div>
    )
}