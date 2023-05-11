import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import * as React from "react";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {Questionnaire} from "../model/questionnaire";

type QuestionnaireProps = {
    questionnaire: Questionnaire;
}
export default function QuestionnaireAccordion(props: QuestionnaireProps) {
    const context = useContext(QuestionnaireProvider)
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChanges =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <div>
            {props.questionnaire.topicResultList!.map((result) => {
                return (
                    <Accordion expanded={expanded === result.name.name} onChange={handleChanges(result.name.name)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
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
                        <AccordionDetails>
                           <Accordion>
                               <p>
                                   Beispieltext
                               </p>
                           </Accordion>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    )
}