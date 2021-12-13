import { 
    Box, 
    Grid, 
    TextField, 
    Button,
    Typography
} from '@mui/material'

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import { getUser } from '../../auth/userInfo'

function UserAppUploadPage(props) {
    const navigate = useNavigate();
    
    const [user] = useState(getUser())
    const [appName, setAppName] = useState("")
    const [githubUri, setGithubUri] = useState("")

    const handleAppNameChange = (evt) => {
        setAppName(evt.target.value)
    };

    const handleUriChange = (evt) => {
        setGithubUri(evt.target.value)
    };

    const apiBuildImage = () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/build`
        const data = {
            "user": user,
            "imageName": `${user}-${appName}`,
            "repo": githubUri
        }
        
        axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`submitting github uri: ${githubUri}`)
        console.log(`submitting app name: ${appName}`)

        apiBuildImage()

        navigate('/profile');
    }

    return (
        <div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                display='flex'
                flexDirection='column'
                margin='auto'
                width='400px'
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
                    Upload Your App
                </Typography>
                <Grid container spacing={4}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="App Name"
                            onChange={handleAppNameChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="GitHub URI"
                            onChange={handleUriChange}
                        />
                    </Grid>
                </Grid>
                <Button fullWidth type="submit" variant="contained"
                    sx={{marginTop: 5}}
                >
                    Upload
                </Button>
            </Box>
        </div>
    )
}

export default UserAppUploadPage;