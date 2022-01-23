import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import jsCookies from 'js-cookie';
import { useCookies } from 'react-cookie'

function Test() {
    const [secret, setSecret] = useState("")
    const navigate = useNavigate();

    const testApi = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/api/test`, { withCredentials: true })
        .then(res => setSecret(res.data))
        .catch(err => {
            if (err.response.status === 401) {
                navigate("/login")
            }
        })
    }

    const logout = () => {
        console.log("logging out")
        axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/logout`, {}, { withCredentials: true })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        logout()
    }, [])

    return (
        <h1>Secret: {secret}</h1>
    )
}

export default Test