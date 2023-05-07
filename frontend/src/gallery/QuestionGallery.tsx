import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import QuestionCard from "../card /QuestionCard";

export default function QuestionGallery() {

    const context = useContext(QuestionnaireProvider)

    return (
        <div className={"QuestionGallery"}>
            {context.allQuestions.map(question => {
                return <QuestionCard key={question.id} question={question}/>
            })}
        </div>
    )
}