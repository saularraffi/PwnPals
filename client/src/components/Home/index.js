import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useState, useEffect } from 'react'
import { getUser, getUserId } from '../../auth/userInfo'
import axios from 'axios';


function HomePage() {
    const [user] = useState(getUser())
    const [userId] = useState(getUserId())
    const [friendsActivities, setFriendsActivities] = useState({})

    const getUserDetails = () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user?id=${userId}`

        axios.get(url).then(res => {
            const friends = res.data.friends
            getContainers(friends[2])
        }).catch(err => {
            console.log(err)
        })
    }

    const getContainers = (userId) => {
        const url = `${process.env.REACT_APP_BACKEND}/api/container/all?userId=${userId}`

        axios.get(url).then(res => {
            console.log(res.data)
            return res
        }).catch(err => {
            console.log(err)
        })
    }

    const getBugReports = (userId) => {
        const url = `${process.env.REACT_APP_BACKEND}/api/bug-report/all?userId=${userId}`

        axios.get(url).then(res => {
            console.log(res.data)
            return res
        }).catch(err => {
            console.log(err)
        })
    }

    const ActivityCard = (user, header, activityTitle, description) => {
        return (
            <Card 
                sx={{
                    minWidth: 700,
                    maxWidth: 1000,
                    margin: 'auto'
                }}
            >
                <CardContent>
                    <Typography variant="h4" component="div">
                        <b>{user}</b> {header}
                    </Typography>
                    <Typography sx={{ mb: 1.5, marginTop: 3, fontSize: '1.5em' }}>
                        {activityTitle}
                    </Typography>
                    <Typography sx={{ mb: 1.5, marginLeft: 5 }} color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Check Out</Button>
                </CardActions>
            </Card>
        )
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <Box sx={{ margin: 20 }}>
            <Typography variant='h2'>Hi, {user}!<br />Welcome to PwnPals!</Typography>
            <Box sx={{ marginTop: 10 }}>
                {ActivityCard(
                    'hacker1337',
                    'has uploaded a new app',
                    'app title',
                    'this is the description for this activity'
                )}
            </Box>
        </Box>
    )
}

export default HomePage