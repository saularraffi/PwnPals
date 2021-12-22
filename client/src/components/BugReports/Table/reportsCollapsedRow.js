import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

import React, { useEffect, useState } from "react";
import axios from 'axios';

import { getUserId, getUser } from '../../../auth/userInfo'
import { useNavigate } from "react-router-dom";
import Comments from './commentsTable'


export default function CollapsedRow({ report, deleteReport, fetchBugReports }) {
    const navigate = useNavigate()
    const [comment, setComment] = useState("")
    const [viewComments, setViewComments] = useState(false)
    const [makeComment, setMakeComment] = useState(false)
    const [userId] = useState(getUserId())
    const [username] = useState(getUser())

    const handleCommentChange = (evt) => {
        setComment(evt.target.value)
        console.log(evt.target.value)
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

    const editReport = () => {
        navigate(`/app/${report.appId}/bug-report/${report._id}/edit`)
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
            fetchBugReports()
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => { }, [])

    return (
        <Box sx={{ margin: '2em' }}>
            <Typography sx={{ marginLeft: 1, marginBottom: 1 }}>{report.description}</Typography>
            <Box sx={{ display: 'flex' }}>
                <Button onClick={handleMakeCommentClick}>
                    Comment
                </Button>
                <Button
                    onClick={viewComments ? handleHideCommentsClick : handleViewCommentsClick}>
                    { viewComments ? "Hide Comments" : "View Comments"}
                </Button>
                { userId === report.userId &&
                    <Box>
                        <Button onClick={editReport}>
                            Edit
                        </Button>
                        <Button style={{ color: 'red' }} onClick={() => deleteReport(report._id)}>
                            Delete
                        </Button>
                    </Box>
                }
            </Box>
            { makeComment && 
                <Box sx={{ margin: '2em 4em 5em 4em' }} component="form"
                    onSubmit={handleSubmit}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{ marginRight: 3 }}>{username[0]}</Avatar>
                        <TextField multiline variant="standard" 
                            onChange={handleCommentChange}
                            value={comment}
                            style={{ height: '10px', width: '100%' }}
                        />
                    </Box>
                    <Button variant="contained" type="submit"
                        sx={{
                            borderRadius: 0,
                            float: 'right',
                            position: 'relative',
                            marginTop: 1
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            }
            <Collapse in={viewComments} timeout="auto" unmountOnExit>
                <Comments comments={report.comments} reportId={report._id} fetchBugReports={fetchBugReports} />
            </Collapse>
        </Box>
    )
}
