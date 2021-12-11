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
import { getUserId } from '../../auth/userInfo'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';


function BugReportFormPage() {
    const navigate = useNavigate();
    const location = useLocation()
    const appId = location.pathname.split('/').at(-2)
    const [appData, setAppData] = useState({})
    const [didMount, setDidMount] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorSubmittingReport, setErrorSubmittingReport] = useState(false)

    const fetchContainer = function() {
        const url = `http://localhost:5000/api/container?id=${appId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setAppData(res.data)
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

        const url = 'http://localhost:5000/api/bug-report'

        const data = {
            userId: getUserId(),
            title: title,
            description: description,
            appId: appData._id
        }

        axios.post(url, data).then(res => {
            console.log(res)
            window.history.back()
        })
        .then(() => {
            navigate(`/bug-reports/${appId}`)
        })
        .catch(err => {
            console.log(err)
            setErrorSubmittingReport(true)
        })
    }

    useEffect(() => {
        fetchContainer()
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
            onSubmit={handleSubmit}
        >
            <Typography
                fontSize={40}
                marginBottom={5}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
            >
                Bug Submission for <b>{appData.imageName}</b>
            </Typography>
            <Grid container spacing={4}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Title"
                        onChange={handleTitleChange}
                        sx={{ width: '50%' }}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        label="Description"
                        multiline
                        fullWidth
                        rows={5}
                        onChange={handleDescriptionChange}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Button sx={{ width: '20%' }} type="submit" variant="contained">
                        Submit Bug
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BugReportFormPage