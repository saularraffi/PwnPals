import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LandingPage() {
    const navigate = useNavigate();

    const logIn = () => {
        localStorage.setItem('loggedIn', true)
        navigate('/home')
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