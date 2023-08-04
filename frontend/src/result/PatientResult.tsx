import * as React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./PatientResult.css";
import {Questionnaire} from "../model/questionnaire";
import {useContext, useRef} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import QuestionnaireAccordion from "./QuestionnaireAccordion";
import {Button} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {useNavigate} from "react-router-dom";
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
    const [allExpanded, setAllExpanded] = React.useState<boolean>(false);
    const pdfRef = useRef<HTMLDivElement>(null);
    const context = useContext(QuestionnaireProvider)
    console.log(context.currentQuestionnaire)
    const [value, setValue] = React.useState(0);
    const nextStatus: { IN_PROGRESS: "CLOSED", OPEN: "IN_PROGRESS", CLOSED: "CLOSED" } = {
        "IN_PROGRESS": "CLOSED",
        "OPEN": "IN_PROGRESS",
        "CLOSED": "CLOSED"
    }
    const navigate = useNavigate()


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function onAdvanceClick(questionnaire: Questionnaire) {
            context.put({
                id: questionnaire.id,
                status: nextStatus[questionnaire.status],
                results: new Map<string, boolean>()
            })
    }
    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input!).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            // eslint-disable-next-line
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Ergebnis Fragebogen.pdf');
        });
    }
    const expandAllCards = () => {
        if (allExpanded) {
            setAllExpanded(false);
        } else {
            setAllExpanded(true);
        }
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
                    {context.allQuestionnaires.filter(questionnaire => questionnaire.status === props.name).reverse().map(questionnaire => {
                        return (
                            <Tab label={questionnaire.id}/>
                        )
                    })}
                </Tabs>
                {context.allQuestionnaires.filter(questionnaire => questionnaire.status === props.name).reverse().map((questionnaire, index) => {
                    return (
                        <TabPanel isHidden={!props.isOpen} value={value} index={index}>
                            <div ref={pdfRef}>
                            <QuestionnaireAccordion  allExpanded={allExpanded} questionnaire={questionnaire}/>
                                </div>
                            <div className={"Button-Container"}>
                                <div></div>
                                <Button variant="outlined" color="error"
                                        onClick={() => navigate("/questionnaire/" + questionnaire.id)}>DETAILS</Button>
                                <Button variant="outlined" color="error"
                                        onClick={() => onAdvanceClick(questionnaire)}>ABGESCHLOSSEN</Button>
                                <Button sx={{width: 'fit-content'}} onClick={downloadPDF}>PDF herunterladen</Button>
                                <Button onClick={expandAllCards}>
                                    {allExpanded ? 'Alle Karten einklappen' : 'Alle Karten aufklappen'}
                                </Button>
                            </div>
                        </TabPanel>
                    )
                })}
        </Box>
    )

}

