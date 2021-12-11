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
import { styled } from '@mui/material/styles';
import axios from 'axios';


function AppsTable({ apps, getContainers }) {
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

        const url = `http://localhost:5000/api/container/${action}`

        await axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        // stateChange === true ? setStateChange(false) : setStateChange(true)
    }

    const deleteContainer = async (mongoId, containerId) => {
        const url = "http://localhost:5000/api/container"

        const data = {
            mongoId: mongoId,
            containerId: containerId
        }

        await axios.delete(url, { data: data }).then(res => {
            getContainers()
        }).catch(err => {
            console.log(err)
        })
    }

    const openApp = function(port) {
        console.log("opening app")
        window.open(`http://localhost:${port}`);
    }

    function Row(props) {
        const app = props.row;
        const [open, setOpen] = React.useState(false);
      
        return (
            <React.Fragment>
                <StyledTableRow
                    key={app.name}
                >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell><Typography>{app.imageName}</Typography></TableCell>
                    <TableCell><Typography>{app.port}</Typography></TableCell>
                    <TableCell><Typography>{app.status}</Typography></TableCell>
                    <TableCell><Typography>{app.created}</Typography></TableCell>
                </StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box 
                            sx={{
                                marginTop: 3,
                                marginBottom: 3,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: app.status === 'running' ? '45%' : '40%'
                            }}>
                                { app.status === 'running' &&
                                    <Button variant="contained" onClick={() => openApp(app.port)}>
                                        Open
                                    </Button>
                                }
                                { app.status === 'running'
                                    ?   <Button variant="contained" color="error"
                                            onClick={() => toggleContainerState(app._id, app.containerId, 'stop')}
                                        >
                                            Stop
                                        </Button>
                                    :   <Button variant="contained" color="success"
                                            onClick={() => toggleContainerState(app._id, app.containerId, 'start')}
                                        >
                                            Start
                                        </Button>
                                }
                                <Button variant="contained" color="info">View Bugs</Button>
                                <Button variant="contained" color="warning">Submit Bug</Button>
                                <Button variant="contained" color="error"
                                    onClick={() => deleteContainer(app._id, app.containerId)}
                                >
                                    Delete
                                </Button>
                          </Box>
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
                My Apps
            </Typography>
            <Table>
                <TableHead sx={{ backgroundColor: '#1976d2  ' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={tableHeaderStyles}>Name</TableCell>
                        <TableCell sx={tableHeaderStyles}>Port</TableCell>
                        <TableCell sx={tableHeaderStyles}>Status</TableCell>
                        <TableCell sx={tableHeaderStyles}>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {apps.map((row) => (  
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AppsTable