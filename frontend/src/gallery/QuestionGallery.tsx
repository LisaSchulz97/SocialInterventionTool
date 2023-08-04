import {useContext, useEffect, useState} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import QuestionCard from "../cards/QuestionCard";
import "./QuestionGallery.css";
import {Questionnaire} from "../model/questionnaire";
import {useNavigate, useParams} from "react-router-dom";
import {useQuestions} from "../hook/useQuestions";

export default function QuestionGallery() {

    const context = useContext(QuestionnaireProvider)
    const [resultMap, setResultMap] = useState<Map<string, boolean>>(new Map().set("test", true))
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)
    const cssActive: string = " Active-Question"
    const navigate = useNavigate()
    const {getAllQuestions, allQuestions} = useQuestions()
    const {id} = useParams<{ id: string }>()


    console.log(resultMap)


    useEffect(() => {
            getAllQuestions()
            initializeMap()
        },//eslint-disable-next-line
        []
    )

    function handleNext() {
        if (activeQuestionIndex === allQuestions.length - 1){
            const questionnaire: Questionnaire = {
                results: resultMap,
                status: "OPEN",
                userId: id
            }
            context.setCurrentQuestionnaire(questionnaire)
            navigate("address")
        }
        setActiveQuestionIndex(activeQuestionIndex + 1)
    }


    function setQuestionResult (id: string, answer: boolean) {
        setResultMap(resultMap.set(id, answer))
    }
    function initializeMap() {
        let tempMap = new Map<string, boolean>()
        allQuestions.forEach(question => tempMap.set(question.id, false))
        tempMap.forEach((value, key) => console.log(key, value))
        setResultMap(tempMap)
    }


    return (
        <div className={"QuestionGallery"}>
            {allQuestions.map((question, index) => {
                return (
                <div className={"CardContainer".concat(index === activeQuestionIndex ? cssActive : "")}>
                <QuestionCard key={question.id} question={question} resultMap={resultMap} saveAnswer={setQuestionResult} handleNext={handleNext}/>
                </div>
                )})}
        </div>
    )
}