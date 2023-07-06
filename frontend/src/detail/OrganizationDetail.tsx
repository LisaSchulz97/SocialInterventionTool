import {OrganizationProvider} from "../context/OrganizationContext";
import React, {useContext, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./OrganizationDetail.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Button} from "@mui/material";

export default function OrganizationDetail() {

    const context = useContext(OrganizationProvider)
    const pdfRefs = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
        //eslint-disable-next-line
    },[])

    function goBack() {
        navigate(-1);
    }

    const downloadDetailPDF = () => {
        const input = pdfRefs.current;
        html2canvas(input!).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(context.currentOrganization.name + '.pdf');
        });
    }


    return (
            <div className={"OrganizationDetail"}>
                <div ref={pdfRefs}>
                <div className={"DetailElement"}>
                    <label>Anbieter: </label>
                    <p>{context.currentOrganization.name}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>Beschreibung: </label>
                    <p>{context.currentOrganization.description}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>Straße und Hausnummer: </label>
                    <p>{context.currentOrganization.contact.address.street_and_number}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>PLZ: </label>
                    <p>{context.currentOrganization.contact.address.postal_code}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>Ort: </label>
                    <p>{context.currentOrganization.contact.address.location}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>Email: </label>
                    <p>{context.currentOrganization.contact.e_mail}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>Telefon: </label>
                    <p>{context.currentOrganization.contact.phone}</p>
                </div>
                <div className={"DetailElement"}>
                    <label>Webseite: </label>
                    <p>{context.currentOrganization.contact.website}</p>
                </div>
            </div>
                <Button sx={{width: 'fit-content'}} onClick={downloadDetailPDF}>PDF herunterladen</Button>
                <Button onClick={goBack}>Zurück</Button>
            </div>

            )

}