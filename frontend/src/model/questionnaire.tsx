import {TopicResult} from "./topicResult";

export type Questionnaire = {
    results: Map<string, boolean>,
    street_and_number? : string,
    plz?: string,
    id?: string,
    status: "OPEN" | "IN_PROGRESS" | "CLOSED",
    topicResultList?: TopicResult[]
}

export const dummyQuestionnaire: Questionnaire = {
    results: Map.prototype,
    street_and_number: "",
    plz: "",
    id: "",
    status: "OPEN",
    topicResultList: []
}