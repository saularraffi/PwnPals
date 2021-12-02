import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import { getUser } from '../../auth/userInfo'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    form: {
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: '#b0e0e6'
    },
    textField: {
        // justifyContent: "center",
        // alignItems: "center",
    },
    btn: {
        // justifyContent: "center",
        // alignItems: "center",
    }
})

function UserAppUploadPage(props) {
    const [user] = useState(getUser())
    const [appName, setAppName] = useState("")
    const [githubUri, setGithubUri] = useState("")
    const navigate = useNavigate();
    const classes = useStyles()

    const handleAppNameChange = (evt) => {
        setAppName(evt.target.value)
    };

    const handleUriChange = (evt) => {
        setGithubUri(evt.target.value)
    };

    const apiBuildImage = () => {
        const url = "http://localhost:5000/api/build"
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

        navigate('/apps');
    }

    return (
        <div>
            <h1>Upload your app</h1>
            {/* <Box
                component="form"
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            ></Box> */}
            <FormGroup 
                lassName={classes.form}
                noValidate
                autoComplete='off'
            >
                <TextField
                    className={classes.textField}
                    required
                    id="app-name"
                    name='app-name'
                    label="App Name"
                    placeholder="Type in your app name"
                    variant='filled'
                    onChange={handleAppNameChange}
                />
                <br/>
                <TextField
                    className={classes.textField}
                    required
                    id="github-uri"
                    name='github-uri'
                    label="GitHub URI"
                    placeholder="Type in your project's GitHub URI"
                    variant='filled'
                    onChange={handleUriChange}
                />
                <br/>
                <Button className={classes.btn} variant="contained">
                    Build App
                </Button>
            </FormGroup>
        </div>
    )
}

export default UserAppUploadPage;