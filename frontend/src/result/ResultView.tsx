import PatientResult from "./PatientResult";
import {useState} from "react";
import "./PatientResult.css";
import {Typography} from "@mui/material";
import {dummyQuestionnaire} from "../model/questionnaire";


export default function ResultView() {

    const [open, setOpen] = useState<boolean>(true)

    return (
        <div className="flex-container">
            <div className={open ? "grow" : "shrink"}>
                <PatientResult name="IN_PROGRESS" isOpen={open} setOpen={setOpen} questionnaire={dummyQuestionnaire}/>
            </div>
            <div className={open ? "shrink" : "grow"}>
                <Typography variant={"h6"} sx={{fontWeight: 80}}>Alt</Typography>
                <PatientResult name="CLOSED" isOpen={!open} setOpen={setOpen} questionnaire={dummyQuestionnaire}/>
            </div>
        </div>
    )
}