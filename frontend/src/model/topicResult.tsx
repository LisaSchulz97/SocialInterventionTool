import {Organization} from "./organization";

export type TopicResult = {
    organizations: Organization[],
    name: {searchTerms : string[], name: string},
    score: number
}
