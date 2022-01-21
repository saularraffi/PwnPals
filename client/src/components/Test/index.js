import { useEffect } from 'react'
import axios from 'axios'

function Test() {

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/api/test`, { withCredentials: true })
    })

    return (
        <h1>This is a test</h1>
    )
}

export default Test