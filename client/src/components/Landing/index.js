import {
    Typography,
    Button,
    Container,
    Paper,
    Box
} from '@mui/material'

import NavBar from '../NavBar/landingPageNavBar'
import ImageCard from '../ImageCard'

import programmer_image from '../../images/programmer_card_image.png'
import hacker_image from '../../images/hacker_card_image.png'
import headerImage from '../../images/coding.png'

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isLoggedIn } from '../../auth/userInfo'


function LandingPage() {
    const navigate = useNavigate();
    
    const cardInfo1 = {
        title: 'Develop and Upload Apps',
        image: programmer_image,
        description: `Develop your own secure applications and upload them here! Challenge 
        your friends to hack your apps!`
    }
    
    const cardInfo2 = {
      title: 'Hack Apps',
      image: hacker_image,
      description: `Browse other people's applications and put your hacking skills to the test! Find bugs,
      submit bugs, and rise through the hacker ranks!`
    }

    const navigateOnClick = function(path) {
        navigate(path)
    }

    useEffect(() => {
        if (isLoggedIn() === 'true') {
            navigate('/home')
        }
    })

    return (
        <Box
            sx={{
                marginTop: 7,
                position: 'absolute',
                left: 0,
                right: 0,
            }}
        >
            <Box 
                style={{
                    backgroundColor: '#1976d2',
                }}
            >
                <Box style={{ marginLeft: 100, height: '25em' }}>
                    <Paper elevation={0}
                        sx={{ 
                            display:'inline', 
                            float: 'right', 
                            backgroundColor: 'transparent',
                            marginTop: 10,
                            marginRight: 10
                        }}>
                        <img src={headerImage} alt=""/>
                    </Paper>
                    <Typography
                        sx={{
                            fontSize: '2.5em',
                            paddingTop: 10
                        }}
                        style={{
                            color: 'white'
                        }}
                    >
                        A community for application <br/> developers and hackers!
                    </Typography>
                    
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#E77F0A' }}
                        sx={{
                            marginTop: 5,
                            marginBottom: 10
                        }}
                        onClick={() => navigateOnClick('/register')}
                    >
                        Create Account
                    </Button>
                </Box>
            </Box>
            <Container
                sx={{ 
                    display: 'flex',
                    marginTop: 25,
                    marginBottom: 30,
                    width: '60%',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ImageCard cardInfo={cardInfo1} />
                <ImageCard cardInfo={cardInfo2} />
            </Container>
        </Box>
    )
}

export default LandingPage