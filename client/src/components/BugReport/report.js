import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function BugReportPage() {
    const location = useLocation()
    const reportId = location.pathname.split('/').at(-1)
    const [bugReport, setBugReport] = useState({})
    const [didMount, setDidMount] = useState(false)

    const fetchBugReports = function() {
        const url = `http://localhost:5000/api/bug-report?id=${reportId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setBugReport(res.data)
        }).catch(err => {
            console.log(err)
        })

        setDidMount(true)
    }

    useEffect(() => {
        fetchBugReports()
    }, [didMount])

    return (
        <div>
            <h1>{bugReport.title}</h1>
            <p><b>Date:</b>{bugReport.created}</p>
            <h3>Description:</h3>
            <p>{bugReport.description}</p>
        </div>
    )
}

export default BugReportPage