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
import { setLoggedInStatus, setUser, isLoggedIn, setUserId } from '../../auth/userInfo'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const useStyles = makeStyles({
    checkbox: {
        marginTop: 20,
        marginBottom: 20
    }
})

function LoginForm() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false)

    const navigate = useNavigate();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (e) => {
        // fixes some issue with aborting request
        e.preventDefault()

        const data = {
            username: username,
            password: password
        }

        axios.post(`http://localhost:5000/api/auth/local`, data)
        .then(res => {
            console.log(res)
            setLoggedInStatus(true)
            setUser(username)
            setUserId(res.data)
            navigate('/home')
        })
        .catch(err => {
            if (err.request.status === 401) {
                console.log("Access Denied")
                setLoginAttemptFailed(true)
            }
            else {
                console.log(err)
            }
        })
    }

    const navigateOnClick = function(path) {
        navigate(path)
    }

    return (
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
                Log In
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

            { loginAttemptFailed &&
                <Typography style={{ color: 'red', marginTop: 20 }}>Login attempt failed</Typography>
            }

            <FormControlLabel 
                className={classes.checkbox}
                value="female" 
                control={<Checkbox />} 
                label="Keep me logged in" 
            />
            <Button fullWidth type="submit" variant="contained">
                Log In
            </Button>
            <Button fullWidth variant="contained"
                style={{ backgroundColor: "#E77F0A" }}
                sx={{ marginTop: 3 }}
                onClick={() => navigateOnClick('/register')}
            >
                Create Account
            </Button>
        </Box>
    )
}

export default LoginForm