import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserAppPage() {
    const location = useLocation();
    const appId = location.pathname.split('/').at(-1)
    const [appData, setAppData] = useState()

    const fetchContainer = function() {
        const url = `http://localhost:5000/api/container?id=${appId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setAppData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchContainer()
    }, [appData])

    return (
        <div>
            <h1>This is the user app page</h1>
        </div>
    )
}

export default UserAppPage