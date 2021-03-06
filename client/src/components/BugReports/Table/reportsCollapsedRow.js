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
    const [editComment, setEditComment] = useState(false)
    const [userId] = useState(getUserId())
    const [username] = useState(getUser())
    const [commentId, setCommentId] = useState("")

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
        setEditComment(false)

        if (makeComment) {
            setMakeComment(false)
            setComment("")
        }
        else {
            setMakeComment(true)
        }
    }

    const handleEditCommentClick = () => {
        setEditComment(true)
    }

    const editReport = () => {
        navigate(`/app/${report.appId}/bug-report/${report._id}/edit`)
    }

    const handleSubmitComment = (evt) => {
        evt.preventDefault()

        const url = `${process.env.REACT_APP_BACKEND}/api/comment`

        const data = {
            reportId: report._id,
            comment: comment
        }

        axios.post(url, data, { withCredentials: true }).then(res => {
            console.log(res)
            setComment("")
            fetchBugReports()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleEditComment = (evt) => {
        evt.preventDefault()

        const url = `${process.env.REACT_APP_BACKEND}/api/comment`

        const data = {
            reportId: report._id,
            commentId: commentId,
            commentBody: comment
        }

        axios.put(url, data, { withCredentials: true }).then(res => {
            console.log(res)
            fetchBugReports()
        }).catch(err => {
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
                        <Button onClick={editReport}>Edit</Button>
                        <Button style={{ color: 'red' }} onClick={() => deleteReport(report._id)}>
                            Delete
                        </Button>
                    </Box>
                }
            </Box>
            { (makeComment || editComment) &&
                <Box sx={{ margin: '2em 4em 4em 4em' }} component="form"
                    onSubmit={makeComment ? handleSubmitComment : handleEditComment}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{ marginRight: 3 }}>{username[0]}</Avatar>
                        <TextField multiline variant="standard" 
                            onChange={handleCommentChange}
                            value={comment}
                            autoFocus
                            onFocus={function(e) {
                                var val = e.target.value;
                                e.target.value = '';
                                e.target.value = val;
                            }}
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
                        { makeComment
                            ? <Typography>Submut</Typography>
                            : <Typography>Save</Typography>
                        }
                    </Button>
                </Box>
            }
            <Collapse in={viewComments} timeout="auto" unmountOnExit>
                <Comments
                    comments={report.comments}
                    reportId={report._id}
                    fetchBugReports={fetchBugReports}
                    handleEditCommentClick={handleEditCommentClick}
                    setEditComment={setEditComment}
                    setMakeComment={setMakeComment}
                    setComment={setComment}
                    setCommentId={setCommentId}
                    handleMakeCommentClick={handleMakeCommentClick}
                />
            </Collapse>
        </Box>
    )
}
