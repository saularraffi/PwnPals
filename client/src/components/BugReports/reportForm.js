import { 
    Box, 
    Checkbox, 
    Grid, 
    TextField, 
    FormControlLabel,
    Button,
    Typography
} from '@mui/material'

import React, { useEffect, useState } from "react";
import { getUser, getUserId } from '../../auth/userInfo'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';


function BugReportFormPage({ edit }) {
    const navigate = useNavigate();
    const location = useLocation()
    const [appData, setAppData] = useState({})
    const [reportDetails, setReportDetails] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [didMount, setDidMount] = useState(false)
    const [errorSubmittingReport, setErrorSubmittingReport] = useState(false)

    let appId = 0
    let reportId

    if (edit) {
        appId = location.pathname.split('/').at(-4)
        reportId = location.pathname.split('/').at(-2)
    }
    else {
        appId = location.pathname.split('/').at(-2)
    }

    const fetchContainer = function() {
        const url = `${process.env.REACT_APP_BACKEND}/api/user-app?id=${appId}`

        axios.get(url, { withCredentials: true }).then(res => {
            console.log(res.data)
            setAppData(res.data)
        }).catch(err => {
            console.log(err)
        })

        setDidMount(true)
    }

    const fetchBugReport = function() {
        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report?id=${reportId}`

        axios.get(url, { withCredentials: true }).then(res => {
            setReportDetails(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
        }).catch(err => {
            console.log(err)
        })

        setDidMount(true)
    }

    const handleTitleChange = (evt) => {
        setTitle(evt.target.value)
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report`

        const data = {
            userId: getUserId(),
            username: getUser(),
            title: title,
            description: description,
            appId: appData._id
        }

        axios.post(url, data, { withCredentials: true }).then(res => {
            console.log(res)
            window.history.back()
        })
        .catch(err => {
            console.log(err)
            setErrorSubmittingReport(true)
        })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()

        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report`

        const data = {
            id: reportId,
            title: title,
            description: description,
        }

        axios.put(url, data, { withCredentials: true }).then(res => {
            window.history.back()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const renderTitle = () => {
        if (edit) {
            return (
                <Typography
                    fontSize={40}
                    marginBottom={5}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    Editing Report <strong>{reportDetails.title}</strong>
                </Typography>
            )
        }
        else {
            return (
                <Typography
                    fontSize={40}
                    marginBottom={5}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    Bug Submission for <strong>{appData.username}</strong>
                </Typography>
            )
        }
    }

    useEffect(() => {
        if (edit) {
            fetchBugReport()
        }
        else {
            fetchContainer()
        }
    }, [didMount])

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            display='flex'
            flexDirection='column'
            margin='auto'
            width={800}
            marginTop='10%'
            onSubmit={edit ? handleEditSubmit : handleSubmit}
        >
            {renderTitle()}
            <Grid container spacing={4}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{ width: '50%' }}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        multiline
                        fullWidth
                        rows={5}
                        label="Description"
                        defaultValue={description}
                        onChange={handleDescriptionChange}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    { edit
                        ?   <Button sx={{ width: '20%' }} type="submit" variant="contained">
                                Save Edits
                            </Button>
                        :   <Button sx={{ width: '20%' }} type="submit" variant="contained">
                                Submit Bug
                            </Button>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default BugReportFormPage