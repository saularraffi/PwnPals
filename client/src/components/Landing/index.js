import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isLoggedIn } from '../../auth/userInfo'
import axios from 'axios';

function LandingPage() {
    const navigate = useNavigate();

    const logIn = () => {
        navigate('/login')
    }

    useEffect(() => {
        if (isLoggedIn() === 'true') {
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