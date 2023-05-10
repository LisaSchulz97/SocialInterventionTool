import {OrganizationProvider} from "../context/OrganizationContext";
import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./OrganizationDetail.css";
import Header from "../static/Header";

export default function OrganizationDetail() {

    const context = useContext(OrganizationProvider)

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
    }, [])



    return (
        <>
            <Header/>

        <div className={"OrganizationDetail"}>
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
                <label>Maps: </label>
                <p>{context.currentOrganization.contact.address.maps}</p>
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
        </>
    )
}