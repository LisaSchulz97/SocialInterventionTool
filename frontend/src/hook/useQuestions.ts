import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {Question} from "../model/question";

export function useQuestions () {

    const [allQuestions, setAllQuestions] = useState<Question[]>([])


    function getAllQuestions(): void {
        axios.get("/api/question")
            .then(response => setAllQuestions(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function getQuestionText(id: string) {
        const question = allQuestions.find(q => q.id === id)
        return question?.poll
    }

    return {
        allQuestions,
        getAllQuestions,
        getQuestionText
    }

}