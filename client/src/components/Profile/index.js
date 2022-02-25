import {
    Avatar,
    Typography,
    Box,
    Button,
    Container,
} from '@mui/material'
import {
    Add as AddIcon,
    Check as CheckIcon,
    Close as CloseIcon,
} from '@material-ui/icons'
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import AppTable from '../UserAppsTable'
import BugReportsTable from '../UserBugReportsTable'
import { getUser, getUserId } from '../../auth/userInfo'

function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation()
    const [userId] = useState(getUserId())
    const [profileUserId] = useState(location.pathname.split('/').at(-1))
    const [appList, setAppList] = useState([])
    const [bugReportList, setBugReportList] = useState([])
    const [username, setUsername] = useState("")
    const [isMyProfile, setIsMyProfile] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const getUsername = () => {
        if (profileUserId === userId) {
            setIsMyProfile(true)
            setUsername(getUser())
        }
        else {
            fetchUsername().then(username => {
                setUsername(username)
            })
        }
    }

    const checkFollowStatus = () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user/?id=${userId}`

        axios.get(url, { withCredentials: true }).then(res => {
            setIsFollowing(res.data.following.includes(profileUserId))
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchUsername = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user/?id=${profileUserId}`

        return await axios.get(url, { withCredentials: true }).then(res => {
            return res.data.username
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchContainers = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user-app/all?userId=${profileUserId}`

        await axios.get(url, { withCredentials: true }).then(res => {
            setAppList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchBugReports = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report/all?userId=${profileUserId}`

        await axios.get(url).then(res => {
            setBugReportList(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const navigateOnClick = (path) => {
        navigate(path)
    }

    const handleFollowUser = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user`

        const data = {
            id: userId,
            follow: profileUserId
        }

        await axios.put(url, data, { withCredentials: true }).then(res => {
            setIsFollowing(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleUnfollowUser = async () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user`

        const data = {
            id: userId,
            unfollow: profileUserId
        }

        await axios.put(url, data, { withCredentials: true }).then(res => {
            setIsFollowing(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const FollowButton = () => {
        if (isMyProfile) return null

        return (
            <Button variant="contained"
                sx={{ margin: 'auto 3em' }}
                onClick={handleFollowUser}
            >
                <AddIcon style={{ marginRight: 10 }} />
                Follow
            </Button>
        )
    }

    const UnfollowButton = () => {
        if (isMyProfile) return null

        return (
            <Button variant="contained"
                sx={{ margin: 'auto 3em', ':hover': { backgroundColor: '#F73636' }}}
                onClick={handleUnfollowUser}
            >
                <CloseIcon style={{ marginRight: 10 }} />
                Unfollow
            </Button>
        )
    }

    useEffect(() => {
        getUsername()
        checkFollowStatus()
        fetchContainers()
        fetchBugReports()
    }, [])

    return (
        <Box sx={{ margin: 20 }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar sx={{ margin: 'auto 2em auto 0', width: 80, height: 80 }}>
                    <Typography sx={{ fontSize: 50 }}>{username[0]}</Typography>
                </Avatar>
                <Typography sx={{ margin: 'auto 0', fontSize: 60 }}>{username}</Typography>
                { isFollowing 
                    ? <UnfollowButton />
                    : <FollowButton /> 
                }
            </Box>
            <Container sx={{marginTop: 10}}>
                <Button variant="contained" color="success"
                    style={{paddingLeft: 5, marginBottom: 10}}
                    onClick={() => navigateOnClick('/upload')}
                >
                    <AddIcon style={{ marginRight: 10 }} />
                    New
                </Button>
                <AppTable 
                    isMyProfile={isMyProfile} 
                    username={username}
                    apps={appList} 
                    fetchContainers={fetchContainers} 
                    nav={navigateOnClick}
                />
            </Container>
            <Container sx={{ marginTop: 15 }}>
                <BugReportsTable 
                    bugReports={bugReportList}
                    isMyProfile={isMyProfile} 
                    username={username}
                />
            </Container>
        </Box>
    )
}

export default ProfilePage