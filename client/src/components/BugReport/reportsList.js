import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Add as AddIcon } from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';


function BugReportsList() {
    const navigate = useNavigate();
    const location = useLocation()
    const appId = location.pathname.split('/').at(-1)
    const [bugReports, setBugReports] = useState([])

      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const fetchBugReports = function() {
        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report/all?appId=${appId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setBugReports(res.data.reverse())
        }).catch(err => {
            console.log(err)
        })
    }

    const displayDescription = (description) => {
        description = description.substring(0,50)
        if (description.length >= 15) {
            description = description + '...'
        }
        return description
    }

    // const deleteReport = (id) => {
    //     const url = `${process.env.REACT_APP_BACKEND}/api/bug-report`

    //     const data = {
    //         id: id
    //     }

    //     axios.delete(url, { data: data }).then(res => {
    //         console.log(res)
    //         fetchBugReports()
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const tableHeaderStyles = {
        fontSize: '1.3em',
        color: 'white',
        fontWeight: 'bold'
    }

    const navigateOnClick = (path) => {
        navigate(path)
    }

    useEffect(() => {
        fetchBugReports()
    }, [])

    return (
        <Box sx={{ margin: '10% 10% 10% 10%'}}>
            <Button variant="contained" color="success"
                style={{paddingLeft: 5, marginBottom: 15}}
                onClick={() => navigateOnClick(`/app/${appId}/bug-report`)}
            >
                <AddIcon style={{ marginRight: 10 }} />
                Submut Report
            </Button>
            <TableContainer>
                <Table sx={{ minWidth: 700 }}>
                    <TableBody>
                        {bugReports.map((report) => (
                            <StyledTableRow key={report.name}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt="Remy Sharp"
                                            // src="/static/images/avatar/1.jpg"
                                        />
                                    }
                                    title={report.title}
                                    titleTypographyProps={{
                                        fontSize: '1.2em',
                                        fontWeight: 'bold',
                                        marginLeft: 3,
                                        color: '#1976d2'
                                    }}
                                />
                                <TableCell align="right" sx={{ fontSize: '1.2em' }}>
                                    {report.created}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BugReportsList