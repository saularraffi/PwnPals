import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import jsCookies from 'js-cookie';
import { useCookies } from 'react-cookie'

function Test() {
    const [secret, setSecret] = useState("")
    const navigate = useNavigate();
    const [cookie1] = useState(jsCookies.get('sessionId'))
    const [cookie2] = useCookies()

    useEffect(() => {
        console.log(cookie2.sessionId)

        axios.get(`${process.env.REACT_APP_BACKEND}/api/test`, { withCredentials: true })
        .then(res => setSecret(res.data))
        .catch(err => {
            if (err.response.status === 401) {
                navigate("/login")
            }
        })
    })

    return (
        <h1>Secret: {secret}</h1>
    )
}

export default Test