import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

function BugReportsList(prop) {
    const location = useLocation()
    const appId = location.pathname.split('/').at(-1)
    const [didMount, setDidMount] = useState(false)
    const [bugReports, setBugReports] = useState([])

    console.log(appId)

    const fetchBugReports = function() {
        const url = `http://localhost:5000/api/bug-report/all?appId=${appId}`

        axios.get(url).then(res => {
            console.log(res.data)
            setBugReports(res.data)
        }).catch(err => {
            console.log(err)
        })

        setDidMount(true)
    }

    const displayDescription = (description) => {
        description = description.substring(0,50)
        if (description.length >= 15) {
            description = description + '...'
        }
        return description
    }

    const deleteReport = (id) => {
        const url = 'http://localhost:5000/api/bug-report'

        const data = {
            id: id
        }

        axios.delete(url, { data: data }).then(res => {
            console.log(res)
            fetchBugReports()
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchBugReports()
    }, [didMount])

    return (
        <div>
            <h3>Bug Reports for {prop.appName}</h3>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td><b>Title</b></td>
                        <td><b>Description</b></td>
                        <td><b>Date</b></td>
                    </tr>
                </thead>
                <tbody>
                    {bugReports.map((report) => {
                        return (
                            <tr>
                                <td key='delete-btn'>
                                    <button onClick={() => deleteReport(report._id)}>Delete</button>
                                </td>
                                <td key={report.title}>
                                    <a href={`../bug-report/${report._id}`}>{report.title}</a>
                                </td>
                                <td key={report.description}>{displayDescription(report.description)}</td>
                                <td key={report.created}>{report.created}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BugReportsList