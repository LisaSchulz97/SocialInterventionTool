import { CardContent, Container, Typography} from "@mui/material";
import {Organization} from "../model/organization";
import Paper from "@mui/material/Paper";

type OrganizationCardProps = {
    organization: Organization
}

export default function OrganizationCard(props: OrganizationCardProps) {

    return (
        <Container sx={{py: 2, display: 'flex', justifyContent: 'center'}} maxWidth="lg">
            <Paper  sx={{
                width: '80%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: "1.5rem" }}>
                <CardContent sx={{flexGrow: 1, display: "flex", justifyContent: "space-between", gap: "2rem", width: "100%", alignItems: "center"}}>
                    <Typography variant={"h5"} component="div" gutterBottom>
                        {props.organization.name}
                    </Typography>
                    <div>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {props.organization.contact.address.street_and_number}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {props.organization.contact.address.postal_code}
                    </Typography>
                    </div>
                    <Typography variant="h6" color="text.secondary" component="div">
                        {props.organization.contact.phone}
                    </Typography>
                </CardContent>
            </Paper>
        </Container>

    );
}
