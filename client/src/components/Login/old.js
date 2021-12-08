import { useState, useEffect } from 'react'
import { setLoggedInStatus, setUser, isLoggedIn, setUserId } from '../../auth/userInfo'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = (e) => {
        // fixes some issue with aborting request
        e.preventDefault()

        const data = {
            username: username,
            password: password
        }

        axios.post(`http://localhost:5000/api/auth/local`, data)
        .then(res => {
            console.log(res)
            setLoggedInStatus(true)
            setUser(username)
            setUserId(res.data)
            navigate('/home')
        })
        .catch(err => {
            if (err.request.status === 401) {
                console.log("Access Denied")
            }
            else {
                console.log(err)
            }
        })
    }

    // useEffect(() => {
    //     if (isLoggedIn() === 'true') {
    //         navigate('/home')
    //     }
    // })

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Username: <input type="text" name="username" onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                Password: <input type="password" name="password" onChange={handlePasswordChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
            </form>
            <button onClick={() => navigate('/register')}>Create Account</button>
        </div>
    )
}

export default LoginPage