import {Card, CardContent, Container, Typography} from "@mui/material";
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
                backgroundColor: "#f7fbfc",
                borderRadius: "1.5rem",
                borderColor:"#110101"
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
