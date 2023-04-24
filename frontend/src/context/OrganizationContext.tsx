import {Organization} from "../model/organization";
import {ReactElement, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {createContext} from "react";

export const OrganizationProvider = createContext<{
    allOrganizations: Organization[]
}>(
    {
        allOrganizations: []
    })
export default function OrganizationContext(props: { children: ReactElement }) {
    const [allOrganizations, setAllOrganizations] = useState<Organization[]>([])

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

    return (
        <OrganizationProvider.Provider
            value={{
                allOrganizations: allOrganizations
            }}>
            {props.children}
        </OrganizationProvider.Provider>

    )
}