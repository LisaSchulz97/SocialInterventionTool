import {OrganizationProvider} from "../context/OrganizationContext";
import {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import FormView from "../form/FormView";

export default function ChangeView() {

    const context = useContext(OrganizationProvider)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            context.getById(id)
        }
    },
        //eslint-disable-next-line
        [])


    return (
        <FormView toPost={false}/>
    )
}
