import {dummyOrganization, NewOrganization, Organization} from "../model/organization";
import {ReactElement, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {createContext} from "react";

export const OrganizationProvider = createContext<{
    allOrganizations: Organization[],
    getAllOrganizations: () => void,
    resetState: () => void,
    currentOrganization: Organization,
    getById: (id: string) => void,
    post: (organization: NewOrganization) => void,
    delete: (id: string) => void,
    update: (organization: NewOrganization) => void
    searchText: string,
    setSearchText: (value: string) => void
}>(
    {
        allOrganizations: [],
        getAllOrganizations: () => {},
        resetState: () => {},
        currentOrganization: {
            id: "",
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
                website: ""
            }
        },
        post: () => {},
        delete: () => {},
        getById: () => {},
        update: () => {},
        searchText: "",
        setSearchText: () => {}
    })

export default function OrganizationContext(props: { children: ReactElement }) {
    const [allOrganizations, setAllOrganizations] = useState<Organization[]>([])
    const [currentOrganization, setCurrentOrganization] = useState<Organization>(dummyOrganization)
    const [searchText, setSearchText] = useState("")

    function resetState(): void {
        setAllOrganizations([])
    }

    function getAllOrganizations(): void {
        axios.get("/api/organization")
            .then(response => setAllOrganizations(response.data))
    }

    function getOrganizationById(id: string): void {
        axios.get<Organization>(`/api/organization/${id}`)
            .then(response => {
                setCurrentOrganization(response.data)
            })
    }

    function updateOrganization(organization: NewOrganization): void {
        axios.put<Organization>(`/api/organization/${organization.id}`, organization)
            .then(response => {
                setAllOrganizations(allOrganizations.map(o => o.id === response.data.id ? response.data : o));
                setCurrentOrganization(dummyOrganization);
                toast.success("Successfully updated!");
            })
            .catch(() => toast.error("Failed to update organization!"));
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
                delete: deleteOrganization,
                getAllOrganizations: getAllOrganizations,
                resetState: resetState,
                update: updateOrganization,
                searchText,
                setSearchText
            }}>
            {props.children}
        </OrganizationProvider.Provider>

    )
}