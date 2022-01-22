import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    IconButton,
    Grid,
    Badge,
    Menu,
    MenuItem,
} from '@mui/material'

import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
} from '@material-ui/icons'

import { isLoggedIn, logOut, getUserId } from '../../auth/userInfo'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SearchBar from './searchBar'


function MyNavBar() {
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(isLoggedIn())
    const [userId, setUserId] = useState(getUserId())

    const rootBoxStyles = {
        flexGrow: 1,
        width: '100%',
        position: 'sticky',
        top: 0,
        marginBottom: 7,
        zIndex: 9999
    }

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleLogOut = () => {
        logOut()
        setUserIsLoggedIn(false)
        navigate('/')
    }

    const navigateOnClick = (path) => {
        if (window.location.pathname === path) {
            window.location.reload(false)
        }
        navigate(path)
    }

    useEffect(() => {
        setUserIsLoggedIn(isLoggedIn())
    })

    const NavMenu = () => {
        const [menuIsOpen, setMenuIsOpen] = useState(false)

        const handleMenuClose = () => {
            setMenuIsOpen(true)
        }

        return (
            <Menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={menuIsOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            </Menu>
        )
    }

    const NavMenuButton = () => {
        return (
            <IconButton>
                <AccountCircleIcon style={{ color: 'white', fontSize: 35 }} />
            </IconButton>
        )
    }

    const NavButtons = () => {
        console.log(userIsLoggedIn)
        if (userIsLoggedIn) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton sx={{ margin: 'auto 0.5em' }}>
                        <Badge badgeContent={17} color="error" 
                            sx={{ color: 'white' }}
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Button variant="contained" disableElevation 
                        style={{ color: 'white', fontSize: '1.1em' }}
                        onClick={() => navigateOnClick('/search')}
                    >
                        Search
                    </Button>
                    <Button variant="contained" disableElevation 
                        style={{ color: 'white', fontSize: '1.1em' }}
                        onClick={() => navigateOnClick(`/profile/${userId}`)}
                    >
                        Profile
                    </Button>
                    <Button variant="contained" disableElevation 
                        style={{ color: 'white', fontSize: '1.1em' }}
                        onClick={handleLogOut}
                    >
                        Logout
                    </Button>
                    <NavMenuButton />
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
            <AppBar elevation={userIsLoggedIn ? 5 : 0} style={{ backgroundColor: '#1976d2' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    <Box>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button onClick={() => navigateOnClick('/home')}>
                            <Typography variant="h5" component="div" 
                                style={{ color: 'white' }}>
                                PwnPals
                            </Typography>
                        </Button>
                    </Box>
                    { userIsLoggedIn &&
                        <SearchBar />
                    }
                    <Box>
                        <NavButtons />
                        <NavMenu />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MyNavBar