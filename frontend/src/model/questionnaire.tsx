import {FinalResult} from "./finalResult";

export type Questionnaire = {
    results: Map<string, boolean>,
    street_and_number : string,
    plz: string,
    id: string,
    status: "OPEN" | "IN_PROGRESS" | "CLOSED",
    finalResult: FinalResult
}

export const dummyQuestionnaire: Questionnaire = {
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
}