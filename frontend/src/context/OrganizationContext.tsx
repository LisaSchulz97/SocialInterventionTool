import {dummyOrganization, Organization} from "../model/organization";
import {ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {createContext} from "react";

export const OrganizationProvider = createContext<{
    allOrganizations: Organization[],
    currentOrganization: Organization,
    post: (organization: Organization) => void
}>(
    {
        allOrganizations: [],
        currentOrganization: {id: "",
            name: "",
            category: "BERATUNG",
            topic: "ARMUT",
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
        post: () => {}
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

    function postOrganization(organization: Organization): void {
        axios.post<Organization>("/api/organization", organization)
            .then(response => {
                setAllOrganizations([...allOrganizations, response.data])
                toast.success("Successfully added!")
                setCurrentOrganization(dummyOrganization)
            })
            .catch(() => toast.error("Failed to add organization!"))
    }


    return (
        <OrganizationProvider.Provider
            value={{
                allOrganizations: allOrganizations,
                currentOrganization: currentOrganization,
                post: postOrganization
            }}>
            {props.children}
        </OrganizationProvider.Provider>

    )
}