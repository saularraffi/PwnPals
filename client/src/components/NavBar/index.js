import { useEffect, useState } from 'react'

import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    IconButton,
    Grid
} from '@mui/material'

import {
    Menu as MenuIcon
} from '@material-ui/icons'

import { isLoggedIn, logOut } from '../../auth/userInfo'
import { useNavigate } from "react-router-dom";


function MyNavBar() {
    const navigate = useNavigate();

    const rootBoxStyles = {
        flexGrow: 1,
        width: '100%',
        position: 'sticky',
        top: 0,
        marginBottom: 7
    }

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleLogOut = () => {
        logOut()
        navigate('/')
    }

    const navigateOnClick = (path) => {
        navigate(path)
    }

    const renderButtons = () => {
        if (isLoggedIn()) {
            return (
                <Box>
                    <Button sx={{ color: 'white', fontSize: '1.1em' }}
                        onClick={() => navigateOnClick('/')}
                    >
                        Home
                    </Button>
                    <Button variant="contained" disableElevation 
                        style={{ paddingRight: 15, color: 'white', fontSize: '1.1em' }}
                        onClick={() => navigateOnClick('/profile')}
                    >
                        Profile
                    </Button>
                    <Button variant="contained" disableElevation 
                        style={{ color: 'white', fontSize: '1.1em' }}
                        onClick={handleLogOut}
                    >
                        Logout
                    </Button>
                </Box>
            )
        }
        else {
            return (
                <Button variant="contained" disableElevation 
                    style={{ color: 'white', fontSize: '1.1em' }}
                    onClick={handleLogIn}
                >
                    Login
                </Button>
            )
        }
    }

    return (
        <Box sx={rootBoxStyles}>
            <AppBar style={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        PwnPals
                    </Typography>
                    {renderButtons()}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MyNavBar