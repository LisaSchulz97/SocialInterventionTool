import {Address, Contact, dummyOrganization, Organization} from "../model/organization";
import {OrganizationProvider} from "../context/OrganizationContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import "./AddView.css";


export default function AddView() {


    const [newOrganization, setNewOrganization] = useState<Organization>(dummyOrganization)
    const [newContact, setNewContact] = useState<Contact>(dummyOrganization.contact)
    const [newAddress, setNewAddress] = useState<Address>(dummyOrganization.contact.address)
    const context = useContext(OrganizationProvider)

    function onInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewOrganization({...newOrganization, [event.target.name]: event.target.value})
    }
    function onContactChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewContact({...newContact, [event.target.name]: event.target.value})
    }
    function onAddressChange(event: ChangeEvent<HTMLInputElement>): void {
        setNewAddress({...newAddress, [event.target.name]: event.target.value})
    }

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        setNewOrganization({...newOrganization, [event.target.name]: event.target.value})
    }

    function onSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const organizationsToAdd: Organization = {...newOrganization, contact: {...newContact, address : newAddress}}
        context.post(organizationsToAdd)
        setNewOrganization(dummyOrganization)
    }

    return (
        <div className={"AddView"}>
            <form onSubmit={onSave}>
                <div className={"form-element"}>
                    <label htmlFor={"organization-name"}>Name: </label>
                    <input type={"text"} id={"organization-name"} name={"name"} value={newOrganization.name} onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-category"}>Kategorie: </label>
                    <select id={"organization-category"} name={"category"} value={newOrganization.category} onChange={onSelectChange}>
                        <option value={"BERATUNG"}>Beratung</option>
                        <option value={"ANGEBOTE"}>Angebote</option>
                    </select>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-topic"}>Thema: </label>
                    <select id={"organization-topic"} name={"topic"} value={newOrganization.topic} onChange={onSelectChange}>
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
                    <input type={"text"} id={"organization-description"} name={"description"} value={newOrganization.description} onChange={onInputChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-street_and_number"}>Straße und Hausnummer: </label>
                    <input type={"text"} id={"organization-street_and_number"} name={"street_and_number"} value={newAddress.street_and_number} onChange={onAddressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-postal_code"}>PLZ: </label>
                    <input type={"text"} id={"organization-postal_code"} name={"postal_code"} value={newAddress.postal_code} onChange={onAddressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-location"}>Ort: </label>
                    <input type={"text"} id={"organization-location"} name={"location"} value={newAddress.location} onChange={onAddressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-maps"}>Maps: </label>
                    <input type={"text"} id={"organization-maps"} name={"maps"} value={newAddress.maps} onChange={onAddressChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-e_mail"}>Email: </label>
                    <input type={"text"} id={"organization-e_mail"} name={"e_mail"} value={newContact.e_mail} onChange={onContactChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-phone"}>Telefon: </label>
                    <input type={"text"} id={"organization-phone"} name={"phone"} value={newContact.phone} onChange={onContactChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-mailto"}>Mail-Pfad: </label>
                    <input type={"text"} id={"organization-mailto"} name={"mailto"} value={newContact.mailto} onChange={onContactChange}/>
                </div>
                <div className={"form-element"}>
                    <label htmlFor={"organization-website"}>Website: </label>
                    <input type={"text"} id={"organization-website"} name={"website"} value={newContact.website} onChange={onContactChange}/>
                </div>
                <button type={"submit"}>Speichern</button>
            </form>
        </div>
    )
}