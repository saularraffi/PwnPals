import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BugReportsList from '../BugReport/reportsList'
import axios from 'axios';

function UserAppPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const appId = location.pathname.split('/').at(-1)
    const [appData, setAppData] = useState({})
    const [didMount, setDidMount] = useState(false)

    const fetchContainer = function() {
        const url = `http://localhost:5000/api/container?id=${appId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setAppData(res.data)
        }).catch(err => {
            console.log(err)
        })

        setDidMount(true)
    }

    const navigateToReportForm = () => {
        navigate(`/bug-report/${appId}`)
    }

    useEffect(() => {
        fetchContainer()
    }, [didMount])

    return (
        <div>
            <h1>{appData.imageName}</h1>
            <h3>App Details</h3>
            <p><b>Port:</b> {appData.port}</p>
            <p><b>Status:</b> {appData.status}</p>
            <p><b>Created:</b> {appData.created}</p>
            <button onClick={navigateToReportForm}>Submit Bug</button>
            <BugReportsList appName={appData.imageName}/>
        </div>
    )
}

export default UserAppPage