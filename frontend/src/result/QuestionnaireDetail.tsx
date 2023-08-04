import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./QuestionnaireDetail.css"
import {useQuestions} from "../hook/useQuestions";

export default function QuestionnaireDetail () {
    const context = useContext(QuestionnaireProvider)
    const {getAllQuestions, getQuestionText } = useQuestions()

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            getAllQuestions()
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
                            <>
                            {getQuestionText(key)}
                                {value? "Ja" : "Nein"}
                            </>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}