import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function LandingPage() {
    const navigate = useNavigate();

    const logIn = () => {
        localStorage.setItem('loggedIn', true)
        navigate('/home')

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // axios.get('http://localhost:5000/api/auth', options)
        // .then(() => {
        //     console.log("successful authentication")
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

    useEffect(() => {
        if (localStorage.getItem('loggedIn') == 'true') {
            navigate('/home')
        }
    })

    return (
        <div>
            <h1>PwnPals</h1>
            <h1>The #1 platform for building and hacking each other's applications</h1>
            <button onClick={logIn}>Login</button>
        </div>
    )
}

export default LandingPage