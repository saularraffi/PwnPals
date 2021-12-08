import { 
    Box, 
    Checkbox, 
    Grid, 
    TextField, 
    FormControlLabel,
    Button,
    Typography
} from '@mui/material'

import { makeStyles } from '@mui/styles'

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const useStyles = makeStyles({
    checkbox: {
        marginTop: 20,
        marginBottom: 20
    }
})

function CreateAccountPage() {
    const classes = useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (e) => {
        // fixes some issue with aborting request
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }

        axios.post(`http://localhost:5000/api/user`, data)
        .then(res => {
            console.log(res)
            navigate('/login')
        })
        .catch(err => {
            if (err.request.status === 401) {
                console.log("Access Denied")
            }
            else {
                console.log(err)
            }
        })
    }

    return (
        <div>
            <Box
                id={classes.form}
                component="form"
                className={classes.form}
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
                    Registration
                </Typography>
                <Grid container spacing={4}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Username"
                            onChange={handleUsernameChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Password"
                            type="password"
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                </Grid>
                <FormControlLabel 
                    className={classes.checkbox}
                    value="female" 
                    control={<Checkbox />} 
                    label="Keep me logged in" 
                />
                <Button fullWidth type="submit" variant="contained"
                    style={{backgroundColor: '#E77F0A'}}
                >
                    Create Account
                </Button>
            </Box>
        </div>
    )
}

export default CreateAccountPage