import {
    createContext,
    ReactElement,
    useContext,
    useEffect,
    useState
} from "react";
import {dummyQuestion, Question} from "../model/question";
import {dummyQuestionnaire, Questionnaire} from "../model/questionnaire";
import axios from "axios";
import {toast} from "react-toastify";
import {UserProvider} from "./UserContext";

export const QuestionnaireProvider = createContext<{
    allQuestions: Question[],
    allQuestionnaires: Questionnaire[],
    getAllQuestions: () => void,
    getAllQuestionnaires: () => void,
    currentQuestionnaire: Questionnaire,
    setCurrentQuestionnaire: (questionnaire: Questionnaire) => void,
    getById: (id: string) => void,
    post: (questionnaire: Questionnaire) => void,
    put: (questionnaire: Questionnaire) => void,
    getQuestionById: (id: string) => void,
    currentQuestion: Question
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
            userId: "",
            status: "OPEN",
            topicResultList: []
        },
        setCurrentQuestionnaire: () => {},
        getById: () => {},
        post: () => {},
        put: () => {},
        getQuestionById: () => {},
        currentQuestion: {
            id: "",
            poll: "",
            topic: {searchTerms: ["ARMUT"], name: "ARMUT"}
        }
    })

export default function QuestionnaireContext(props: { children: ReactElement }) {
    const {isLoggedIn} = useContext(UserProvider)
    const [allQuestions, setAllQuestions] = useState<Question[]>([])
    const [allQuestionnaires, setAllQuestionnaires] = useState<Questionnaire[]>([])
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState<Questionnaire>(dummyQuestionnaire)
    const [currentQuestion, setCurrentQuestion] = useState<Question>(dummyQuestion)

    useEffect(
        () => {
            if (isLoggedIn) {
                getAllQuestionnaires()
            } else {
                resetStateQuestionnaire()
            }
        },
        [isLoggedIn]
    )

    function resetStateQuestionnaire(): void {
        setAllQuestionnaires([])
    }

    function getAllQuestions(): void {
        axios.get("/api/question")
            .then(response => setAllQuestions(response.data))
    }

    function getQuestionById(id: string): void {
        axios.get<Question>(`/api/question/${id}`)
            .then(response => {
                setCurrentQuestion(response.data)
            })
    }

    function getQuestionnaireById(id: string): void {
        axios.get<Questionnaire>(`/api/questionnaire/${id}`)
            .then(response => {
                setCurrentQuestionnaire(response.data)
            })
    }

    function getAllQuestionnaires(): void {
        axios.get("/api/questionnaire")
            .then(response => {
                setAllQuestionnaires(response.data)
            })
    }

    function postQuestionnaire(questionnaire: Questionnaire): void {
        const json = {...questionnaire, results: Object.fromEntries(questionnaire.results)}
        axios.post<Questionnaire>("/api/questionnaire", json)
            .then(response => {
                setAllQuestionnaires([...allQuestionnaires, response.data])
                setCurrentQuestionnaire(response.data)
            })
            .catch(() => toast.error("Es liegt ein technischer Fehler vor. Bitte informieren Sie die Rezeption."))
    }

    function updateQuestionnaire(questionnaire: Questionnaire): void {
        const json = {...questionnaire, results: Object.fromEntries(questionnaire.results)}
        axios.put<Questionnaire>("/api/questionnaire/" + questionnaire.id, json)
            .then((updatedQuestionnaireResponse) => {
                setAllQuestionnaires(allQuestionnaires.map(currentQuestionnaire => {
                    if (currentQuestionnaire.id === questionnaire.id) {
                        return updatedQuestionnaireResponse.data
                    } else {
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
                put: updateQuestionnaire,
                setCurrentQuestionnaire: setCurrentQuestionnaire,
                getQuestionById: getQuestionById,
                currentQuestion: currentQuestion
            }}>
            {props.children}
        </QuestionnaireProvider.Provider>

    )
}