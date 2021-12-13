import {
    Avatar,
    Typography,
    Box,
    Button,
    Container
} from '@mui/material'
import { Add as AddIcon } from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Table from '../UserAppsTable'
import { getUser, getUserId } from '../../auth/userInfo'

function ProfilePage() {
    const navigate = useNavigate();
    const [appList, setAppList] = useState([])
    const [username] = useState(getUser())
    const [userId] = useState(getUserId())

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
    }, [])

    return (
        <Box sx={{ margin: 20 }}>
            <Typography variant='h2'>Your Profile - {username}</Typography>
            <Container sx={{marginTop: 10}}>
                <Button variant="contained" color="success"
                    style={{paddingLeft: 5, marginBottom: 5}}
                    onClick={() => navigateOnClick('/upload')}
                >
                    <AddIcon style={{ marginRight: 10 }} />
                    New
                </Button>
                <Table apps={appList} getContainers={getContainers} nav={navigateOnClick}/>
            </Container>
        </Box>
    )
}

export default ProfilePage