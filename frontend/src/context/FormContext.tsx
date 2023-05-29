import {ChangeEvent, createContext, FormEvent, ReactElement, useContext, useEffect, useState} from "react";
import {
    Address,
    Contact,
    dummyOrganization,
    newDummyOrganization,
    NewOrganization,
    Organization
} from "../model/organization";
import {OrganizationProvider} from "./OrganizationContext";
import {useNavigate} from "react-router-dom";


export const FormProvider = createContext<{
    dummy: Organization,
    newOrganization: NewOrganization,
    newContact: Contact,
    newAddress: Address,
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    contactChange: (event: ChangeEvent<HTMLInputElement>) => void,
    addressChange: (event: ChangeEvent<HTMLInputElement>) => void,
    selectChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    save: (event: FormEvent<HTMLFormElement>) => void,
    post: (event: FormEvent<HTMLFormElement>) => void
}>( {
    dummy: dummyOrganization,
    newOrganization: newDummyOrganization,
    newContact: dummyOrganization.contact,
    newAddress: dummyOrganization.contact.address,
    inputChange: () => {},
    contactChange: () => {},
    addressChange: () => {},
    selectChange: () => {},
    save: () => {},
    post: () => {}
})
export default function FormContext (props: {children: ReactElement}) {

    const context = useContext(OrganizationProvider)
    const navigate = useNavigate()

    const [newOrganization, setNewOrganization] = useState<NewOrganization>(newDummyOrganization)
    const [newContact, setNewContact] = useState<Contact>(dummyOrganization.contact)
    const [newAddress, setNewAddress] = useState<Address>(dummyOrganization.contact.address)


    useEffect(() => {
        setNewOrganization({...context.currentOrganization, topic: context.currentOrganization.topic.name})
    }, [context.currentOrganization])



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
        const organizationsToAdd: NewOrganization = {...newOrganization, contact: {...newContact, address : newAddress}}
        context.post(organizationsToAdd)
        setNewOrganization(newDummyOrganization)
    }

    function onPost(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        context.post(newOrganization)
        navigate("/")
    }

    return (
        <FormProvider.Provider value={{
            dummy: dummyOrganization,
            newOrganization: newOrganization,
            newContact: newContact,
            newAddress: newAddress,
            inputChange: onInputChange,
            contactChange: onContactChange,
            addressChange: onAddressChange,
            selectChange: onSelectChange,
            save: onSave,
            post: onPost
        }}>
            {props.children}
        </FormProvider.Provider>
    )
}