import {Question} from "../model/question";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";

import {OrganizationProvider} from "../context/OrganizationContext";
import {Organization} from "../model/organization";

type OrganizationCardProps = {
    organization: Organization
}

export default function OrganizationCard(props: OrganizationCardProps) {

    return (
        <Container sx={{py: 8, display: 'flex', justifyContent: 'center'}} maxWidth="lg">
            <Card variant="outlined" sx={{
                width: '80%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: "#dbf5d8",
                borderRadius: "1.5rem"
            }}>
                <CardContent sx={{flexGrow: 1}}>
                    <Typography sx={{fontSize: 18}} gutterBottom>
                        {props.organization.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {props.organization.contact.address.street_and_number}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {props.organization.contact.address.postal_code}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {props.organization.contact.phone}
                    </Typography>
                </CardContent>
            </Card>
        </Container>

    );
}
