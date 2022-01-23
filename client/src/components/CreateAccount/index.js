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
    const [verifiedPassword, setVerifiedPassword] = useState('')
    const [userExists, setUserExists] = useState(false)
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false)
    // const [passError, setPassError] = useState(false)

    const navigate = useNavigate();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleVerifiedPasswordChange = (evt) => {
        setVerifiedPassword(evt.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(`${process.env.REACT_APP_BACKEND}/api/user/verify?username=${username}`, 
            { withCredentials: true }
        )
        .then(res => {
            setUserExists(true)
            setPasswordIsEmpty(false)
            setPasswordsDontMatch(false)
        })
        .catch(err => {
            if (password !== verifiedPassword) {
                setPasswordsDontMatch(true)
                setUserExists(false)
                setPasswordIsEmpty(false)
            }
            else if (password === '') {
                setPasswordIsEmpty(true)
                setUserExists(false)
                setPasswordsDontMatch(false)
            }
            else {
                const data = {
                    username: username,
                    password: password
                }
                
                axios.post(`${process.env.REACT_APP_BACKEND}/api/user`, data, { withCredentials: true })
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
                            autoFocus
                            variant="standard"
                            label="Username"
                            error={userExists}
                            onChange={handleUsernameChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Password"
                            type="password"
                            error={passwordsDontMatch || passwordIsEmpty}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Verify Password"
                            type="password"
                            error={passwordsDontMatch || passwordIsEmpty}
                            onChange={handleVerifiedPasswordChange}
                        />
                    </Grid>
                </Grid>
                
                { userExists &&
                    <Typography style={{ color: 'red', marginTop: 20 }}>
                        This user already exists.
                    </Typography>
                }

                { passwordsDontMatch &&
                    <Typography style={{ color: 'red', marginTop: 20 }}>
                        Passwords don't match.
                    </Typography>
                }

                { passwordIsEmpty &&
                    <Typography style={{ color: 'red', marginTop: 20 }}>
                        Password cannot be empty.
                    </Typography>
                }

                <Button fullWidth type="submit" variant="contained"
                    style={{ backgroundColor: '#E77F0A', marginTop: 40 }}
                >
                    Create Account
                </Button>
            </Box>
        </div>
    )
}

export default CreateAccountPage