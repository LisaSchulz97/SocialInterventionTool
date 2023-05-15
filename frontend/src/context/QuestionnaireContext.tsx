import {createContext, ReactElement, useEffect, useState} from "react";
import {Question} from "../model/question";
import {dummyQuestionnaire, Questionnaire} from "../model/questionnaire";
import axios from "axios";
import {toast} from "react-toastify";

export const QuestionnaireProvider = createContext<{
    allQuestions: Question[],
    allQuestionnaires: Questionnaire[],
    getAllQuestions: () => void,
    getAllQuestionnaires: () => void,
    currentQuestionnaire: Questionnaire,
    getById: (id: string) => void,
    post: (questionnaire: Questionnaire) => void,
    put: (questionnaire: Questionnaire) => void
}>(
    {
        allQuestions: [],
        allQuestionnaires: [],
        getAllQuestions: () => {},
        getAllQuestionnaires: () => {},
        currentQuestionnaire: {
            results: Map.prototype,
            street_and_number: "",
            plz: "",
            id: 0,
            status: "OPEN",
            topicResultList: []
        },
        getById: () => {
        },
        post: () => {
        },
        put: () => {
        }
    })

export default function QuestionnaireContext(props: { children: ReactElement }) {

    const [allQuestions, setAllQuestions] = useState<Question[]>([])
    const [allQuestionnaires, setAllQuestionnaires] = useState<Questionnaire[]>([])
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState<Questionnaire>(dummyQuestionnaire)

    useEffect(
        () => getAllQuestionnaires(),
        []
    )

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
    function getAllQuestionnaires(): void {
        axios.get("/api/questionnaire")
            .then(response => setAllQuestionnaires(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function postQuestionnaire(questionnaire: Questionnaire): void {
        const json = {...questionnaire, results: Object.fromEntries(questionnaire.results)}
        axios.post<Questionnaire>("/api/questionnaire", json)
            .then(response => {
                setAllQuestionnaires([...allQuestionnaires, response.data])
                toast.success("Super, Sie haben alles ausgefüllt! Der Arzt wird das Ergebnis gleich mit Ihnen besprechen")
                setCurrentQuestionnaire(response.data)
            })
            .catch(() => toast.error("Es liegt ein technischer Fehler vor. Bitte informieren Sie die Rezeption."))
    }

    function updateQuestionnaire(questionnaire : Questionnaire): void {
        const json = {...questionnaire, results: Object.fromEntries(questionnaire.results)}
        axios.put<Questionnaire>("/api/questionnaire/" + questionnaire.id, json)
            .then((updatedQuestionnaireResponse) => {
                setAllQuestionnaires(allQuestionnaires.map(currentQuestionnaire => {
                    if (currentQuestionnaire.id === questionnaire.id) {
                        return updatedQuestionnaireResponse.data
                    }
                    else {
                        return currentQuestionnaire
                    }
                }))
            })
    }

    return (
        <QuestionnaireProvider.Provider
            value={{
                allQuestions: allQuestions,
                allQuestionnaires: allQuestionnaires,
                getAllQuestions: getAllQuestions,
                getAllQuestionnaires: getAllQuestionnaires,
                currentQuestionnaire: currentQuestionnaire,
                getById: getQuestionnaireById,
                post: postQuestionnaire,
                put: updateQuestionnaire
            }}>
            {props.children}
        </QuestionnaireProvider.Provider>

    )
}