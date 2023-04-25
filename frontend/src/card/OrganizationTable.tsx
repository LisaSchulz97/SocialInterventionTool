import {useContext} from "react";
import {OrganizationProvider} from "../context/OrganizationContext";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";



export default function OrganizationTable () {
    const context = useContext(OrganizationProvider);




    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ANBIETER</TableCell>
                    <TableCell align="right">STRASSE</TableCell>
                    <TableCell align="right">ORT</TableCell>
                    <TableCell align="right">WEB</TableCell>
                    <TableCell align="right">EMAIL</TableCell>
                    <TableCell align="right">TELEFON</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {context.allOrganizations.map((organization) => (
                    <TableRow
                        key={organization.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {organization.name}
                        </TableCell>
                        <TableCell align="right">{organization.contact.address.street_and_number}</TableCell>
                        <TableCell align="right">{organization.contact.address.location}</TableCell>
                        <TableCell align="right">{organization.contact.website}</TableCell>
                        <TableCell align="right">{organization.contact.mailto}</TableCell>
                        <TableCell align="right">{organization.contact.phone}</TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>
    </TableContainer>
);
}