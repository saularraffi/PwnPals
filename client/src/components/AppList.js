import React, { useEffect, useState } from "react";
import axios from 'axios';

function AppList(props) {
    const [appName, setAppName] = useState()
    const [port, setPort] = useState()
    const [status, setStatus] = useState()
    const [startStopButton, setStartStopButton] = useState()

    const apiGetContainer = () => {
        const url = "http://localhost:5000/api/container"

        axios.get(url).then(res => {
            setAppName(res.data[0].imageName)
            setPort(res.data[0].port)
            setStatus(res.data[0].status)
        }).catch(err => {
            console.log(err)
        })
    }

    const toggleContainerState = (evt) => {
        var url = ""
        const data = {
            "imageName": appName,
        }

        if (evt.target.textContent == "start") {
            url = "http://localhost:5000/api/container/start"
        }
        else {
            url = "http://localhost:5000/api/container/stop"
        }

        axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        // change the status
    }

    useEffect(() => {
        apiGetContainer()

        if (status == "running") {
            setStartStopButton("stop")
        }
        else {
            setStartStopButton("start")
        }
    })

    return (
        <div>
            <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Port</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <button onClick={toggleContainerState}>{startStopButton}</button>
                    </td>
                    <td>{appName}</td>
                    <td>{port}</td>
                    <td>{status}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default AppList;