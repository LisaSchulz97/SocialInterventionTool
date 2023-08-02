import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./QuestionnaireDetail.css"

export default function QuestionnaireDetail () {
    const context = useContext(QuestionnaireProvider)

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
        //eslint-disable-next-line
    }, [])


    return (
        <div className={"QuestionnaireDetail"}>
            <div className={"QuestionnaireDetailElement"}>
                <label>Ergebnisse:</label>
                <ul>
                    {Object.entries(context.currentQuestionnaire.results).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value.toString()} {/* Hier wird der Boolean-Wert in einen String umgewandelt */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}