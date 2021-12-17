import {
    Avatar,
    Typography,
    Box,
    Button,
    Container
} from '@mui/material'
import { Add as AddIcon } from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import Table from '../UserAppsTable'
import { getUser, getUserId } from '../../auth/userInfo'

function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation()
    const [userId] = useState(location.pathname.split('/').at(-1))
    const [appList, setAppList] = useState([])
    const [username, setUsername] = useState("")
    const [isMyProfile, setIsMyProfile] = useState(false)

    const getUsername = () => {
        if (userId === getUserId()) {
            setIsMyProfile(true)
            setUsername(getUser())
        }
        else {
            fetchUsername().then(username => {
                setUsername(username)
            })
        }
    }

    const fetchUsername = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user/?id=${userId}`

        return await axios.get(url).then(res => {
            return res.data.username
        }).catch(err => {
            console.log(err)
        })
    }

    const getContainers = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/container/all?userId=${userId}`

        await axios.get(url).then(res => {
            setAppList(res.data)
            console.log(res.data)
            console.log("Getting containers")

        }).catch(err => {
            console.log(err)
        })
    }

    const navigateOnClick = (path) => {
        navigate(path)
    }

    useEffect(() => {
        getContainers()
        getUsername()
    }, [])

    return (
        <Box sx={{ margin: 20 }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar sx={{ margin: 'auto 2em auto 0', width: 80, height: 80 }}>
                    <Typography sx={{ fontSize: 50 }}>{username[0]}</Typography>
                </Avatar>
                <Typography sx={{ margin: 'auto 0', fontSize: 60 }}>{username}</Typography>
            </Box>
            <Container sx={{marginTop: 10}}>
                <Button variant="contained" color="success"
                    style={{paddingLeft: 5, marginBottom: 10}}
                    onClick={() => navigateOnClick('/upload')}
                >
                    <AddIcon style={{ marginRight: 10 }} />
                    New
                </Button>
                <Table 
                    isMyProfile={isMyProfile} 
                    username={username}
                    apps={appList} 
                    getContainers={getContainers} 
                    nav={navigateOnClick}
                />
            </Container>
        </Box>
    )
}

export default ProfilePage