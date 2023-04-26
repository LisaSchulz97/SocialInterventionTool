import {useContext} from "react";
import {FormProvider} from "../context/FormContext";
import "./FormView.css";

export default function FormView(props: {toPost: boolean}) {

    const formContext = useContext(FormProvider)

    return (
        <div className={"FormView"}>
            <form onSubmit={props.toPost ? formContext.post: formContext.save}>
                <div className={"form-element"}>
                    <label htmlFor={"organization-name"}>Name: </label>
                    <input type={"text"} id={"organization-name"} name={"name"} value={formContext.newOrganization.name} onChange={formContext.inputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-category"}>Kategorie: </label>
                    <select id={"organization-category"} name={"category"} value={formContext.newOrganization.category} onChange={formContext.selectChange}>
                        <option value={"BERATUNG"}>Beratung</option>
                        <option value={"ANGEBOTE"}>Angebote</option>
                    </select>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-topic"}>Thema: </label>
                    <select id={"organization-topic"} name={"topic"} value={formContext.newOrganization.topic} onChange={formContext.selectChange}>
                        <option value={"ARMUT"}>Armut</option>
                        <option value={"WOHNUNG"}>Wohnung</option>
                        <option value={"EINSAMKEIT"}>Einsamkeit</option>
                        <option value={"KULTUR"}>Kultur</option>
                        <option value={"ARBEIT"}>Arbeit</option>
                        <option value={"AUSBILDUNG"}>Ausbildung</option>
                        <option value={"BEZIEHUNG"}>Beziehung</option>
                        <option value={"ERKRANKUNG"}>Erkrankung</option>
                        <option value={"PFLEGE"}>Pflege</option>
                        <option value={"MISSBRAUCH"}>Missbrauch</option>
                    </select>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-description"}>Beschreibung: </label>
                    <input type={"text"} id={"organization-description"} name={"description"} value={formContext.newOrganization.description} onChange={formContext.inputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-street_and_number"}>Straße und Hausnummer: </label>
                    <input type={"text"} id={"organization-street_and_number"} name={"street_and_number"} value={formContext.newAddress.street_and_number} onChange={formContext.addressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-postal_code"}>PLZ: </label>
                    <input type={"text"} id={"organization-postal_code"} name={"postal_code"} value={formContext.newAddress.postal_code} onChange={formContext.addressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-location"}>Ort: </label>
                    <input type={"text"} id={"organization-location"} name={"location"} value={formContext.newAddress.location} onChange={formContext.addressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-maps"}>Maps: </label>
                    <input type={"text"} id={"organization-maps"} name={"maps"} value={formContext.newAddress.maps} onChange={formContext.addressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-e_mail"}>Email: </label>
                    <input type={"text"} id={"organization-e_mail"} name={"e_mail"} value={formContext.newContact.e_mail} onChange={formContext.contactChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-phone"}>Telefon: </label>
                    <input type={"text"} id={"organization-phone"} name={"phone"} value={formContext.newContact.phone} onChange={formContext.contactChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-mailto"}>Mail-Pfad: </label>
                    <input type={"text"} id={"organization-mailto"} name={"mailto"} value={formContext.newContact.mailto} onChange={formContext.contactChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-website"}>Website: </label>
                    <input type={"text"} id={"organization-website"} name={"website"} value={formContext.newContact.website} onChange={formContext.contactChange}/>
                </div>
                <button type={"submit"}>Speichern</button>
            </form>
        </div>
    )


}