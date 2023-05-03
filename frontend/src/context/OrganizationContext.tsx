import {dummyOrganization, NewOrganization, Organization} from "../model/organization";
import {ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {createContext} from "react";

export const OrganizationProvider = createContext<{
    allOrganizations: Organization[],
    currentOrganization: Organization,
    getById: (id: string) => void,
    post: (organization: NewOrganization) => void,
    delete: (id: string) => void
}>(
    {
        allOrganizations: [],
        currentOrganization: {id: "",
            name: "",
            category: "BERATUNG",
            topic: {searchTerms: ["ARMUT"], name: "ARMUT"},
            description: "",
            contact: {
                address: {
                    street_and_number: "",
                    postal_code: "",
                    location: "",
                    maps: ""
                },
                e_mail: "",
                phone: "",
                mailto: "",
                website: ""}
            },
        post: () => {},
        delete: () => {},
        getById: () => {}
    })

export default function OrganizationContext(props: { children: ReactElement }) {
    const [allOrganizations, setAllOrganizations] = useState<Organization[]>([])
    const [currentOrganization, setCurrentOrganization] = useState<Organization>(dummyOrganization)

    useEffect(() => {
            getAllOrganizations()
        },
        //eslint-disable-next-line
        []
    )

    function getAllOrganizations(): void {
        axios.get("/api/organization")
            .then(response => setAllOrganizations(response.data))
            .catch(() => toast.error("Loading page failed!\nTry again later"))
    }

    function getOrganizationById(id: string): void {
        axios.get<Organization>(`/api/organization/${id}`)
            .then(response => {
                setCurrentOrganization(response.data)
            })
    }

    function postOrganization(organization: NewOrganization): void {
        axios.post<Organization>("/api/organization", organization)
            .then(response => {
                setAllOrganizations([...allOrganizations, response.data])
                toast.success("Successfully added!")
                setCurrentOrganization(dummyOrganization)
            })
            .catch(() => toast.error("Failed to add organization!"))
    }

    function deleteOrganization(id: string) {
        axios.delete("/api/organization/" + id)
            .then(() => {
                setAllOrganizations(allOrganizations.filter((organization) => organization.id !== id))
            })
            .catch(console.error)
    }


    return (
        <OrganizationProvider.Provider
            value={{
                allOrganizations: allOrganizations,
                currentOrganization: currentOrganization,
                getById: getOrganizationById,
                post: postOrganization,
                delete: deleteOrganization
            }}>
            {props.children}
        </OrganizationProvider.Provider>

    )
}