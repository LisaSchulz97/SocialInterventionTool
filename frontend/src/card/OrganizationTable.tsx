import {useContext, useState} from "react";
import {OrganizationProvider} from "../context/OrganizationContext";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./OrganizationTable.css";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import SearchBar from "../search/SearchBar";
import {Language, LocalPostOffice} from "@mui/icons-material";
import {UserProvider} from "../context/UserContext";


export default function OrganizationTable() {
    const userContext = useContext(UserProvider)
    const context = useContext(OrganizationProvider);
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")


    function onChange(value: string) {
        setSearchText(value)
    }

    function onDeleteClick(id: string) {
        context.delete(id)
    }

    const filteredOrganizations = context.allOrganizations.filter((organization) => organization.topic.searchTerms.map((term) => term.toLowerCase()).join(" ").includes(searchText.toLowerCase()))


    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    if (userContext.isAdmin) {
        return (
            <div className="TableStyling">
                <br/>
                <SearchBar text={searchText} onTextChange={onChange}/>
                <br/>
                <br/>
                <TableContainer component={Paper} sx={{width: '100%'}}>
                    <Table id="org-table" aria-label="customized table">
                        <TableHead id={"Table-Head"}>
                            <TableRow>
                                <StyledTableCell>ANBIETER</StyledTableCell>
                                <StyledTableCell align="right">STRASSE</StyledTableCell>
                                <StyledTableCell align="right">ORT</StyledTableCell>
                                <StyledTableCell align="right">WEB</StyledTableCell>
                                <StyledTableCell align="right">EMAIL</StyledTableCell>
                                <StyledTableCell align="right">TELEFON</StyledTableCell>
                                <StyledTableCell align="right">ADMIN</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrganizations.map((organization) => (

                                <StyledTableRow key={organization.id}>

                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        onClick={() => navigate("/organization/details/" + organization.id)}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        {organization.name}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="right">{organization.contact.address.street_and_number}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{organization.contact.address.location}</StyledTableCell>
                                    <StyledTableCell align="right"><a className="clickable-icon"
                                                                      href={organization.contact.website}><Language/></a></StyledTableCell>
                                    <StyledTableCell align="right"><a className="clickable-icon"
                                                                      href={"mailto:" + organization.contact.e_mail}><LocalPostOffice/></a></StyledTableCell>
                                    <StyledTableCell align="right">{organization.contact.phone}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button onClick={() => onDeleteClick(organization.id)}>Löschen</Button>
                                        <Button onClick={() => {
                                            navigate("/organization/edit/" + organization.id)
                                        }}>Bearbeiten</Button>
                                    </StyledTableCell>
                                </StyledTableRow>))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>);
    }

    return (
        <div className="TableStyling">
                <br/>
                <SearchBar text={searchText} onTextChange={onChange}/>
                <br/>
                <br/>
                <TableContainer component={Paper} sx={{width: '100%'}}>
                    <Table id="org-table" aria-label="customized table">
                        <TableHead id={"Table-Head"}>
                            <TableRow>
                                <StyledTableCell>ANBIETER</StyledTableCell>
                                <StyledTableCell align="right">STRASSE</StyledTableCell>
                                <StyledTableCell align="right">ORT</StyledTableCell>
                                <StyledTableCell align="right">WEB</StyledTableCell>
                                <StyledTableCell align="right">EMAIL</StyledTableCell>
                                <StyledTableCell align="right">TELEFON</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrganizations.map((organization) => (

                                <StyledTableRow key={organization.id}>

                                    <StyledTableCell
                                        component="th"
                                        scope="row"
                                        onClick={() => navigate("/organization/details/" + organization.id)}
                                        sx={{cursor: 'pointer'}}
                                    >
                                        {organization.name}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="right">{organization.contact.address.street_and_number}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{organization.contact.address.location}</StyledTableCell>
                                    <StyledTableCell align="right"><a className="clickable-icon"
                                                                      href={organization.contact.website} target={"_blank"}><Language/></a></StyledTableCell>
                                    <StyledTableCell align="right"><a className="clickable-icon"
                                                                      href={"mailto:" + organization.contact.e_mail}><LocalPostOffice/></a></StyledTableCell>
                                    <StyledTableCell align="right">{organization.contact.phone}</StyledTableCell>
                                </StyledTableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
}