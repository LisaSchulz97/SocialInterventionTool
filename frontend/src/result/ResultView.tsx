import PatientResult from "./PatientResult";
import {useState} from "react";
import "./PatientResult.css";
import Header from "../static/Header";


export default function ResultView() {

    const [open, setOpen] = useState<boolean>(true)

    return (
        <div className="flex-container">
            <div className={open ? "grow" : "shrink"}>
                <h2>Open</h2>
                <PatientResult name="IN_PROGRESS" isOpen={open} setOpen={setOpen}/>
            </div>
            <div className={open ? "shrink" : "grow"}>
                <h2>Closed</h2>
                <PatientResult name="CLOSED" isOpen={!open} setOpen={setOpen}/>
            </div>
        </div>
    )
}