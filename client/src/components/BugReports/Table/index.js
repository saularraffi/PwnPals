import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Add as AddIcon } from '@material-ui/icons'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

import { getUserId, getUser } from '../../../auth/userInfo'
import { getReadableDateTime } from '../../../lib/globalFunctions'
import CollapsedRow from './reportsCollapsedRow'

function BugReportsList() {
    const navigate = useNavigate();
    const location = useLocation()
    const [appId] = useState(location.pathname.split('/').at(-1))
    const [bugReports, setBugReports] = useState([])
    const [appDetails, setAppDetails] = useState({})

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

    const fetchBugReports = function() {
        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report/all?appId=${appId}`

        axios.get(url).then(res => {
            setBugReports(res.data.reverse())
            console.log(res.data.length)
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchAppDetails = () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/container?id=${appId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setAppDetails(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const navigateOnClick = (path) => {
        navigate(path)
    }

    const deleteReport = (id) => {
        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report`

        const data = {
            id: id
        }

        axios.delete(url, { data: data }).then(res => {
            console.log(res)
            fetchBugReports()
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchBugReports()
        fetchAppDetails()
    }, [])

    const ReportRow = ({ report }) => {
        const reportId = urlParams.get('report')
        const [open, setOpen] = useState(report._id === reportId ? true : false);

        return (
            <React.Fragment>
                <StyledTableRow key={report.name}>
                    <Box sx={{display: 'flex' }}>
                        <IconButton
                            disableRipple
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                            sx={{ marginLeft: 2 }}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <CardHeader
                            avatar={
                                <Avatar>{report.username[0]}</Avatar>
                            }
                        />
                        <Typography color="#6B6B6B" style={{ 
                                margin: 'auto 0.5em',
                                fontSize: '1.2em',
                                fontWeight: 'bold',
                                marginLeft: 3,
                                color: '#1976d2' }}>
                            {report.title}
                        </Typography>
                        <Typography color="#6B6B6B" sx={{ margin: 'auto 1em' }}>
                            By <Link href={`/profile/${report.userId}`}>{report.username}</Link>
                        </Typography>
                    </Box>
                    <TableCell align="right" sx={{ fontSize: '1.2em' }}>
                        {getReadableDateTime(report.created)}
                    </TableCell>
                </StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CollapsedRow
                            report={report}
                            deleteReport={deleteReport}
                            fetchBugReports={fetchBugReports}
                        />
                    </Collapse>
                </TableCell>
            </React.Fragment>
        )
    }

    return (
        <Box sx={{ margin: '10% 10% 10% 10%'}}>
            <Typography
                fontSize={40}
                marginBottom={5}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
            >
                Bug Submission for <strong>{appDetails.imageName}</strong>
            </Typography>
            <Button variant="contained" color="success"
                style={{paddingLeft: 5, marginBottom: 15}}
                onClick={() => navigateOnClick(`/app/${appId}/bug-report`)}
            >
                <AddIcon style={{ marginRight: 10 }} />
                Submut Report
            </Button>
            { bugReports.length == 0 &&
                <TableContainer>
                    <Table sx={{ minWidth: 700 }}>
                        <TableBody>
                            <TableCell sx={{ fontSize: '1.2em', backgroundColor: '#CCCCCC' }}
                                align="center"
                            >
                                No bugs reported
                            </TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <TableContainer>
                <Table sx={{ minWidth: 700 }}>
                    <TableBody>
                        {bugReports.map((report) => (
                            <ReportRow key={report._id} report={report} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BugReportsList