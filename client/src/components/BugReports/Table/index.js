import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

import { getUserId, getUser } from '../../../auth/userInfo'
import { getReadableDateTime } from '../../../lib/globalFunctions'

function BugReportsList() {
    const navigate = useNavigate();
    const location = useLocation()
    const [appId] = useState(location.pathname.split('/').at(-1))
    const [username] = useState(getUser())
    const [bugReports, setBugReports] = useState([])
    const [appDetails, setAppDetails] = useState({})
    const [userId, setUserId] = useState(getUserId())

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
        fetchAppDetails()
    }, [])

    const CollapsedRow = ({ report }) => {
        const [comment, setComment] = useState("")
        const [viewComments, setViewComments] = useState(false)
        const [makeComment, setMakeComment] = useState(false)

        const handleCommentChange = (evt) => {
            setComment(evt.target.value)
        }

        const handleViewCommentsClick = () => {
            setViewComments(true)
        }

        const handleHideCommentsClick = () => {
            setViewComments(false)
        }

        const handleMakeCommentClick = () => {
            if (makeComment) {
                setMakeComment(false)
            }
            else {
                setMakeComment(true)
            }
        }

        const handleSubmit = (evt) => {
            evt.preventDefault()

            const url = `${process.env.REACT_APP_BACKEND}/api/bug-report`

            const data = {
                id: report._id,
                comment: {userId: userId, username: username, body: comment}
            }

            axios.put(url, data).then(res => {
                console.log(res)
                setComment("")
            })
            .catch(err => {
                console.log(err)
            })
        }

        return (
            <Box sx={{ margin: '2em' }}>
                <Typography sx={{ marginLeft: 1, marginBottom: 1 }}>{report.description}</Typography>
                <Button sx={{ marginRight: 1 }} onClick={handleMakeCommentClick}>
                    Comment
                </Button>
                <Button
                    onClick={viewComments ? handleHideCommentsClick : handleViewCommentsClick}>
                    { viewComments ? "Hide Comments" : "View Comments"}
                </Button>
                { makeComment &&
                    <Box sx={{ margin: '2em 4em 5em 4em' }} component="form"
                        onSubmit={handleSubmit}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Avatar alt="Remy Sharp" sx={{ marginRight: 3 }} />
                            <TextField multiline variant="standard" 
                                onChange={handleCommentChange}
                                value={comment}
                                style={{ height: '10px', width: '100%' }} 
                            />
                        </Box>
                        <Button variant="contained" type="submit"
                            sx={{ borderRadius: 0, float: 'right', position: 'relative' }}
                        >
                            Submit
                        </Button>
                    </Box>
                }
                <Collapse in={viewComments} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: '2em 4em 2em 4em' }}>
                        Comments: <br />
                        --------------------------------------------------
                        <TableContainer>
                            <Table sx={{ minWidth: 700 }}>
                                <TableBody>
                                    {report.comments.map(comment => {
                                        return (
                                            <Typography>{comment.comment}</Typography>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </Box>
                </Collapse>
            </Box>
        )
    }

    const ReportRow = ({ report }) => {
        const [open, setOpen] = React.useState(false);

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
                                <Avatar
                                    alt="Remy Sharp"
                                    // src="/static/images/avatar/1.jpg"
                                />
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
                        { userId === report.userId &&
                            <Button style={{ color: 'red' }} 
                                onClick={() => deleteReport(report._id)}>
                                Delete
                            </Button>
                        }
                    </Box>
                    <TableCell align="right" sx={{ fontSize: '1.2em' }}>
                        {getReadableDateTime(report.created)}
                    </TableCell>
                </StyledTableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CollapsedRow report={report}/>
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
                            <ReportRow report={report} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BugReportsList