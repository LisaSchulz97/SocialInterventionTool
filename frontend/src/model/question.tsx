export type Question = {
    id: string,
    poll: string,
    topic: {searchTerms : string[], name: string}
}

export const dummyQuestion: Question = {
    id: "",
    poll: "",
    topic: {searchTerms: ["ARMUT"], name: "ARMUT"}
}