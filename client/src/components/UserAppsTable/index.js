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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useState, useEffect, useRef } from "react";
import { getUserId } from '../../auth/userInfo'
import { getReadableDateTime } from '../../lib/globalFunctions'

function AppsTable({ apps, fetchContainers, nav, isMyProfile, username }) {
    const [userId] = useState(getUserId())

    const urlParams = new URLSearchParams(window.location.search);

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

    const toggleContainerState = async (mongoId, containerId, action) => {
        const data = {
            mongoId: mongoId,
            containerId: containerId
        }

        const url = `${process.env.REACT_APP_BACKEND}/api/container/${action}`

        await axios.post(url, data, { withCredentials: true }).then(res => {
            console.log(res.status);
            fetchContainers()
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteContainer = async (mongoId, containerId) => {
        const url = `${process.env.REACT_APP_BACKEND}/api/container`

        const data = {
            mongoId: mongoId,
            containerId: containerId
        }

        await axios.delete(url, { data: data, withCredentials: true }).then(res => {
            fetchContainers()
        }).catch(err => {
            console.log(err)
        })
    }

    const openApp = function(id) {
        console.log("opening app")
        window.open(`http://${process.env.REACT_APP_BACKEND}/app/${id}`);
    }

    useEffect(() => {
        
    }, [])

    const CollapsedRow = ({ app }) => {
        const buttonStyles = {
            marginRight: 1
        }

        return (
            <React.Fragment>
                <Box sx={{ marginTop: 3 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Description:</Typography>
                    { app.description !== "" && app.description !== undefined
                        ? <Typography sx={{ marginLeft: 5 }}>{app.description}</Typography>
                        : <Typography sx={{ marginLeft: 5 }}>No description.</Typography>
                    }
                </Box>
                <Box 
                    sx={{
                        marginTop: 3,
                        marginBottom: 3,
                        display: 'flex',
                    }}
                >
                        { app.status === 'running' &&
                            <Button variant="contained" onClick={() => openApp(app._id)}
                                sx={buttonStyles}
                            >
                                Open
                            </Button>
                        }
                        { app.status === 'running'
                            ?   <Button variant="contained" color="error"
                                    onClick={() => toggleContainerState(app._id, app.containerId, 'stop')}
                                    sx={buttonStyles}
                                >
                                    Stop
                                </Button>
                            :   <Button variant="contained" color="success"
                                    onClick={() => toggleContainerState(app._id, app.containerId, 'start')}
                                    sx={buttonStyles}
                                >
                                    Start
                                </Button>
                        }
                        <Button variant="contained" color="info"
                            onClick={() => nav(`/bug-reports/${app._id}`)}
                            sx={buttonStyles}
                        >
                            View Bugs
                        </Button>
                        <Button variant="contained" color="warning"
                            onClick={() => nav(`/app/${app._id}/bug-report`)}
                            sx={buttonStyles}
                        >
                            Submit Bug
                        </Button>
                        { userId === app.userId &&
                            <Button variant="contained" color="error"
                                onClick={() => deleteContainer(app._id, app.containerId)}
                                sx={buttonStyles}
                            >
                                Delete
                            </Button>
                        }
                    </Box>
            </React.Fragment>
        )
    }

    const Row = ({ app }) => {
        const appId = urlParams.get('app')
        const [open, setOpen] = useState(app._id === appId ? true : false);

        return (
            <React.Fragment>
                <StyledTableRow
                    key={app.name}
                >
                    <TableCell sx={{ display: 'flex', width: '100%' }}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>

                        <CircleIcon 
                            style={{
                                margin: 'auto', 
                                color: app.status === 'running' ? 'green' : 'red'
                            }}
                        />
                    </TableCell>
                    <TableCell sx={tableRowStyles}>{app.imageName}</TableCell>
                    <TableCell sx={tableRowStyles}>{app.port}</TableCell>
                    <TableCell sx={tableRowStyles}>{app.status}</TableCell>
                    <TableCell sx={tableRowStyles}>{getReadableDateTime(app.created)}</TableCell>
                </StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CollapsedRow app={app} />
                    </Collapse>
                </TableCell>
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
                { isMyProfile ? 'My Apps'  :  `${username}'s Apps` }
            </Typography>
            <Table>
                <TableHead sx={{ backgroundColor: '#1976d2' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={tableHeaderStyles}>Name</TableCell>
                        <TableCell sx={tableHeaderStyles}>Port</TableCell>
                        <TableCell sx={tableHeaderStyles}>Status</TableCell>
                        <TableCell sx={tableHeaderStyles}>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apps.map((app) => (  
                        <Row key={app._id} id={app._id} app={app} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AppsTable