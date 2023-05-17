import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import * as React from "react";
import {useContext, useEffect, useRef} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {Questionnaire} from "../model/questionnaire";
import OrganizationCard from "../card /OrganizationCard";
import "./PatientResult.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type QuestionnaireProps = {
    questionnaire: Questionnaire,
    allExpanded: boolean
}
export default function QuestionnaireAccordion(props: QuestionnaireProps) {
    const context = useContext(QuestionnaireProvider)
    const [expanded, setExpanded] = React.useState<string | false>(false);


    const handleChanges =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    function sortByScore(score: number, score2: number) {
        return score > score2 ? -1:1;
    }

    function getCssClass(score: number) {
        switch (score) {
            case 2:
                return "colorRed"
            case 1:
                return "colorYellow"
            default:
                return ""
        }
    }

    return (
        <div>
            {props.questionnaire.topicResultList!.sort((a,b) => sortByScore(a.score,b.score)).map((result) => {
                return (

                    <Accordion expanded={(result.score > 0 && expanded === result.name.name) || (props.allExpanded)} onChange={handleChanges(result.name.name)}>
                        <AccordionSummary className={getCssClass(result.score)}
                            expandIcon={result.score > 0 && <ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                {result.name.name}
                            </Typography>
                            <Typography
                                sx={{color: 'text.secondary'}}>{result.score} von 2
                            </Typography>
                        </AccordionSummary>
                        {result.score > 0 && <AccordionDetails>
                            {result.organizations.map(organization => {
                                return (
                                    <OrganizationCard organization={organization}/>
                                )
                            })}
                        </AccordionDetails>}
                    </Accordion>
                )
            })}
        </div>
    )
}