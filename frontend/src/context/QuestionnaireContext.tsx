import {createContext, ReactElement, useState} from "react";
import {Question} from "../model/question";
import {dummyQuestionnaire, Questionnaire} from "../model/questionnaire";
import axios from "axios";
import {toast} from "react-toastify";
export const QuestionnaireProvider = createContext<{
    allQuestions: Question[],
    getAllQuestions: () => void,
    currentQuestionnaire: Questionnaire,
    getById: (id: string) => void,
    post: (questionnaire: Questionnaire) => void
}>(
    {
        allQuestions: [],
        getAllQuestions:() => {},
        currentQuestionnaire: {
            results: Map.prototype,
            street_and_number: "",
            plz: "",
            id: "",
            status: "OPEN",
            finalResult: {
                organizations: Map.prototype,
                topicScore: {
                    topic: {searchTerms: ["ARMUT"], name: "ARMUT"},
                    score: 0
                }
            }
        },
        getById: () => {},
        post: () => {}
    })

export default function QuestionnaireContext (props: {children: ReactElement}) {

    const [allQuestions, setAllQuestions] = useState<Question[]>([])
    const [allQuestionnaires, setAllQuestionnaires] = useState<Questionnaire[]>([])
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState<Questionnaire>(dummyQuestionnaire)

    function getAllQuestions(): void {
        axios.get("/api/question")
            .then(response => setAllQuestions(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function getQuestionnaireById(id: string): void {
        axios.get<Questionnaire>(`/api/questionnaire/${id}`)
            .then(response => {
                setCurrentQuestionnaire(response.data)
            })
    }

    function postQuestionnaire(questionnaire: Questionnaire): void {
        const json = {...questionnaire, results: Object.fromEntries(questionnaire.results)}
        axios.post<Questionnaire>("/api/questionnaire",json)
            .then(response => {
                setAllQuestionnaires([...allQuestionnaires, response.data])
                toast.success("Super, Sie haben alles ausgefüllt! Der Arzt wird das Ergebnis gleich mit Ihnen besprechen")
                setCurrentQuestionnaire(dummyQuestionnaire)
            })
            .catch(() => toast.error("Es liegt ein technischer Fehler vor. Bitte informieren Sie die Rezeption."))
    }


    return (
        <QuestionnaireProvider.Provider
            value={{
                allQuestions: allQuestions,
                getAllQuestions: getAllQuestions,
                currentQuestionnaire: currentQuestionnaire,
                getById: getQuestionnaireById,
                post: postQuestionnaire
            }}>
            {props.children}
        </QuestionnaireProvider.Provider>

    )
}