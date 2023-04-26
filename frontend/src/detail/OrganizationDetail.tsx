import {OrganizationProvider} from "../context/OrganizationContext";
import {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./OrganizationDetail.css";

export default function OrganizationDetail() {

    const context = useContext(OrganizationProvider)

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
    }, [])

    function translateCategory(): string {
        let translatedCategories: string = context.currentOrganization.category.toString()
            .replace("BERATUNG", "Beratung")
            .replace("ANGEBOTE", "Angebote")
        return translatedCategories
    }


    function translateTopic(): string {
        let translatedTopics: string = context.currentOrganization.topic.toString()
            .replace("ARMUT", "Armut")
            .replace("WOHNUNG", "Wohnung")
            .replace("EINSAMKEIT", "Einsamkeit")
            .replace("KULTUR", "Kultur")
            .replace("ARBEIT", "Arbeit")
            .replace("AUSBILDUNG", "Ausbildung")
            .replace("BEZIEHUNG", "Beziehung")
            .replace("ERKRANKUNG", "Erkrankung")
            .replace("PFLEGE", "Pflege")
            .replace("MISSBRAUCH", "Missbrauch")
        return translatedTopics
    }

    return (
        <div className={"OrganizationDetail"}>
            <div className={"DetailElement"}>
                <label>Anbieter: </label>
                <p>{context.currentOrganization.name}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Kategorie: </label>
                <p>{translateCategory()}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Thema: </label>
                <p>{translateTopic()}</p>
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
                <label>Email: </label>
                <p>{context.currentOrganization.contact.phone}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Email: </label>
                <p>{context.currentOrganization.contact.mailto}</p>
            </div>
            <div className={"DetailElement"}>
                <label>Email: </label>
                <p>{context.currentOrganization.contact.website}</p>
            </div>
        </div>
    )
}