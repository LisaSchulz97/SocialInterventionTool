import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PatientResult.css";
import {Questionnaire} from "../model/questionnaire";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import QuestionnaireAccordion from "./QuestionnaireAccordion";
import {Button} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    isHidden: boolean;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            className={"panel".concat(props.isHidden ? " hidden" : "")}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: "100%"}}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default function PatientResult(props: { isOpen: boolean, setOpen: (o: boolean) => void, name: string, questionnaire: Questionnaire }) {
    const context = useContext(QuestionnaireProvider)
    console.log(context.currentQuestionnaire)
    const [value, setValue] = React.useState(0);
    const nextStatus : {IN_PROGRESS: "CLOSED", OPEN: "IN_PROGRESS", CLOSED: "CLOSED"} = {
        "IN_PROGRESS": "CLOSED",
        "OPEN": "IN_PROGRESS",
        "CLOSED": "CLOSED"
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function printAccordionContent() {
        const accordionContent = document.getElementById('accordion-content');
        if (accordionContent) {
            const contentToPrint = accordionContent.innerHTML;
            const printWindow = window.open('', 'Print Window');
            printWindow?.document.write(contentToPrint);
            printWindow?.print();
            printWindow?.close();
        }
    }

        function onAdvanceClick(questionnaire: Questionnaire) {
            const QuestionnaireToUpdate: Questionnaire = {...questionnaire, status: nextStatus[questionnaire.status]}
            context.put({id: questionnaire.id, status: nextStatus[questionnaire.status], results: new Map<string, boolean>()})
        }

    return (
        <Box sx={{flexGrow: props.isOpen ? 1 : 0, bgcolor: 'background.paper', display: 'flex', height: "75vh"}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                onClick={() => props.name === "IN_PROGRESS" ? props.setOpen(true) : props.setOpen(false)}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {context.allQuestionnaires.filter(questionnaire => questionnaire.status === props.name).reverse().map(questionnaire => {
                    return (
                        <Tab label={questionnaire.id}/>
                    )
                })}
            </Tabs>
            {context.allQuestionnaires.filter(questionnaire => questionnaire.status === props.name).reverse().map((questionnaire, index) => {
                return (
                    <TabPanel isHidden={!props.isOpen} value={value} index={index}>
                        <QuestionnaireAccordion questionnaire={questionnaire}/>
                        <div className={"Button-Container"}>
                            <div></div>
                        <Button variant="outlined" color="error" onClick={event => onAdvanceClick(questionnaire)}>ABGESCHLOSSEN</Button>
                        <Button sx={{width: 'fit-content'}} onClick={printAccordionContent}>Drucken</Button>
                        </div>
                    </TabPanel>
                )
            })}
        </Box>
    );

}
