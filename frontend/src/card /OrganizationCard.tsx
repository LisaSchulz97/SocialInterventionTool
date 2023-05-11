import {Question} from "../model/question";
import {useContext} from "react";
import {QuestionnaireProvider} from "../context/QuestionnaireContext";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import "./QuestionCard.css";
import {OrganizationProvider} from "../context/OrganizationContext";
import {Organization} from "../model/organization";

type OrganizationCardProps = {
    organization: Organization
}

export default function OrganizationCard(props: OrganizationCardProps) {

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Card variant="outlined" sx={{
                minWidth: 275,
                maxWidth: 900,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "#dbf5d8",
                borderRadius: "1.5rem"
            }}>
                <CardContent sx={{flexGrow: 1}}>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {props.organization.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.organization.contact.address.street_and_number}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.organization.contact.address.postal_code}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.organization.contact.phone}
                    </Typography>
                </CardContent>
            </Card>
        </Container>

    );
}
