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
import { FlashOnRounded } from '@material-ui/icons';


function HomePage() {
    const [user] = useState(getUser())
    const [userId] = useState(getUserId())
    const [friendsActivities, setFriendsActivities] = useState([])
    const [fetchedUserDetails, setFetchedUserDetails] = useState(false)
    const [reload, setReload] = useState(0)

    const fetchUserDetails = () => {
        const url = `${process.env.REACT_APP_BACKEND}/api/user?id=${userId}`

        axios.get(url).then(async (res) => {
            setFetchedUserDetails(true)
            const friends = res.data.friends
            for (const friend of friends) {
                await Promise.all([
                    axios.get(`${process.env.REACT_APP_BACKEND}/api/container/all?userId=${friend}`),
                    axios.get(`${process.env.REACT_APP_BACKEND}/api/bug-report/all?userId=${friend}`)
                ])
                .then(res => {
                    const activities = {
                        apps: res[0].data,
                        reports: res[1].data
                    }
                    return activities
                })
                // .then(activities => {
                //     for (const activity of activities.apps) {
                //         console.log(activity)
                //     }
                //     for (const activity of activities.reports) {
                //         console.log(activity)
                //     }
                //     return activities
                // })
                .then(activities => { 
                    setFriendsActivities([
                        ...friendsActivities, 
                        ...activities.apps, 
                        ...activities.reports
                    ])
                    // console.log([...friendsActivities, ...res[0].data, ...res[1].data])
                    // console.log(friendsActivities)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const ActivityCard = (activity) => {
        const user = 'hacker1337'

        const header = activity.imageId !== undefined 
        ? 'has submitted a new app' 
        : 'has submitted a new bug'

        const activityTitle = activity.title !== undefined 
        ? activity.title 
        : activity.imageName

        const description = activity.description

        return (
            <Card 
                sx={{
                    minWidth: 700,
                    maxWidth: 1000,
                    margin: '2em auto'
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
        if (!fetchedUserDetails) {
            fetchUserDetails()
        }
        console.log(friendsActivities)
    }, [])

    return (
        <Box sx={{ margin: 20 }}>
            <Typography variant='h2'>Hi, {user}!<br />Welcome to PwnPals!</Typography>
            <Box sx={{ marginTop: 10 }}>
                {
                    friendsActivities.map((activity) => {
                        return (
                            ActivityCard(activity)
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default HomePage