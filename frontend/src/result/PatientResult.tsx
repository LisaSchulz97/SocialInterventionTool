import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PatientResult.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Questionnaire} from "../model/questionnaire";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import QuestionnaireAccordion from "./QuestionnaireAccordion";

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


export default function PatientResult(props: { isOpen: boolean, setOpen: (o: boolean) => void, name: string }) {
    const context = useContext(QuestionnaireProvider)
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


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
                {context.allQuestionnaires.filter(questionnaire => questionnaire.status === props.name).map(questionnaire => {
                    return (
                        <Tab label={questionnaire.id}/>
                    )
                })}
            </Tabs>
            {context.allQuestionnaires.filter(questionnaire => questionnaire.status === props.name).map((questionnaire, index) => {
                return (
                    <TabPanel isHidden={!props.isOpen} value={value} index={index}>
                        <QuestionnaireAccordion questionnaire={questionnaire}/>
                    </TabPanel>
                )
            })}
        </Box>
    );

}
