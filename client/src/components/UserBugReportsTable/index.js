import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getUserId } from '../../auth/userInfo'
import { getReadableDateTime } from '../../lib/globalFunctions'

function UserBugReportsTable({ bugReports, isMyProfile, username }) {

    const navigate = useNavigate();

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const tableHeaderStyles = {
        fontSize: '1.3em',
        color: 'white',
        fontWeight: 'bold'
    }

    const tableRowStyles = {
        fontSize: '1.2em'
    }

    const Row = ({ report }) => {
        const [open, setOpen] = useState(false);

        const trimDescription = (description) => {
            if (description.length > 150) {
                return description.substring(0,150) + "..."
            }
            return description.substring(0,150)
        }

        return (
            <React.Fragment>
                <StyledTableRow
                    key={report.name}
                >
                    <TableCell sx={tableRowStyles}>
                        <Button 
                            sx={{ fontSize: 17 }} 
                            onClick={() => navigate(`/bug-reports/${report.appId}?report=${report._id}`)}
                        >
                            {report.title}
                        </Button>
                    </TableCell>
                    <TableCell sx={tableRowStyles}>{trimDescription(report.description)}</TableCell>
                    <TableCell sx={tableRowStyles}>{getReadableDateTime(report.created)}</TableCell>
                </StyledTableRow>
            </React.Fragment>
        )
    }

    return (
        <TableContainer>
            <Typography
                sx={{ 
                    textAlign: 'center',
                    fontSize: '2em',
                    backgroundColor: '#606061',
                    color: 'white',
                    paddingTop: 1,
                    paddingBottom: 1
                }}
            >
                { isMyProfile ? 'My Bug Reports'  :  `${username}'s Bug Reports` }
            </Typography>
            <Table>
                <colgroup>
                    <col style={{width:'25%'}}/>
                    <col style={{width:'65%'}}/>
                    <col style={{width:'10%'}}/>
                </colgroup>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow>
                        <TableCell sx={tableHeaderStyles}>Title</TableCell>
                        <TableCell sx={tableHeaderStyles}>Description</TableCell>
                        <TableCell sx={tableHeaderStyles}>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bugReports.map((report) => (
                        <Row key={report._id} id={report._id} report={report} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserBugReportsTable