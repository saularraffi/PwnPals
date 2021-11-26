import { useState, useEffect } from 'react'
import { setLoggedInStatus, setUser, isLoggedIn } from '../../auth/userInfo'
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState()

    const navigate = useNavigate();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handleSubmit = () => {
        setLoggedInStatus(true)
        setUser(username)
        navigate('/home')
    }

    useEffect(() => {
        if (isLoggedIn() === 'true') {
            navigate('/home')
        }
    })

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Username: <input type="text" name="username" onChange={handleUsernameChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default LoginPage