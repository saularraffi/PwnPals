import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserAppsPage(props) {
    const [startStopButton, setStartStopButton] = useState()
    const [appList, setAppList] = useState([])
    const [appCount, setAppCount] = useState(appList.length)
    const [stateChange, setStateChange] = useState()

    const apiGetContainer = async () => {
        const url = "http://localhost:5000/api/container"

        await axios.get(url).then(res => {
            setAppList(res.data)
            console.log(res.data)

        }).catch(err => {
            console.log(err)
        })
    }

    const toggleContainerState = async (evt) => {
        var url = "http://localhost:5000/api/container/start"
        const data = {
            "imageName": appList[0].imageName,
        }

        if (evt.target.textContent === "Start") {
            url = "http://localhost:5000/api/container/start"
        }
        else {
            url = "http://localhost:5000/api/container/stop"
        }

        await axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        stateChange === true ? setStateChange(false) : setStateChange(true)
    }

    const deleteContainer = async () => {
        const url = "http://localhost:5000/api/container"

        const payload = {
            "imageName": appList[0].imageName
        }

        await axios.delete(url, {data: payload}).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        setAppCount(appList.length)
    }

    useEffect(() => {
        apiGetContainer()
    }, [appCount, stateChange])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td><b>Action</b></td>
                        <td><b>Name</b></td>
                        <td><b>Port</b></td>
                        <td><b>Status</b></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {appList.map((app) => {
                        return (
                            <tr>
                                <td>
                                    {app.status === "running" &&
                                        <button onClick={toggleContainerState}>Stop</button>
                                    ||
                                    app.status === "exited" &&
                                        <button onClick={toggleContainerState}>Start</button>
                                    }
                                </td> 
                                <td>{app.imageName}</td>
                                <td>{app.port}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status === "running" &&
                                        <button>Open</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={deleteContainer}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserAppsPage;