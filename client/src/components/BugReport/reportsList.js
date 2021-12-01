import React, { useEffect, useState } from "react";
import axios from 'axios';

function BugReportsList(prop) {
    const [didMount, setDidMount] = useState(false)
    const [bugReports, setBugReports] = useState([])

    const fetchBugReports = function() {
        console.log("fetching data")
        const url = `http://localhost:5000/api/bug-report/all?imageId=${prop.imageId}`

        axios.get(url).then(res => {
            console.log(res.data)
            // res.data.map(report => {
            //     res.data.description = report.description.substring(0,15)
            //     if (res.data.description.length >= 15) {
            //         res.data.description = res.data.description + ' ...'
            //     }
            // })
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

    useEffect(() => {
        fetchBugReports()
    }, [didMount])

    return (
        <div>
            <h1>Bug Reports for {prop.appName}</h1>
            <table>
                <thead>
                    <tr>
                        <td><b>Title</b></td>
                        <td><b>Description</b></td>
                        <td><b>Date</b></td>
                    </tr>
                </thead>
                <tbody>
                    {bugReports.map((report) => {
                        return (
                            <tr>
                                <td>{report.title}</td>
                                <td>{displayDescription(report.description)}</td>
                                <td>{report.created}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BugReportsList