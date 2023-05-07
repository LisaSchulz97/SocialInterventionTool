import {TopicScore} from "./topicScore";

export type FinalResult = {
    organizations: Map<string, string[]>,
    topicScore: TopicScore
}