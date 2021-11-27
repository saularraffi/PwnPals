import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from '@material-ui/core';

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

    const toggleContainerState = async (id, action) => {
        const data = {
            "containerId": id
        }

        const url = `http://localhost:5000/api/container/${action}`

        await axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        stateChange === true ? setStateChange(false) : setStateChange(true)
    }

    const deleteContainer = async (app) => {
        const url = "http://localhost:5000/api/build"

        const data = {
            "imageId": app.imageId
        }

        await axios.delete(url, {data: data}).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        setAppCount(appList.length)
        stateChange === true ? setStateChange(false) : setStateChange(true)
        console.log(`number of app: ${appList.length}`)
    }

    const openApp = function(port) {
        console.log("opening app")
        window.open(`http://localhost:${port}`);
    }

    useEffect(() => {
        apiGetContainer()
    }, [appCount, stateChange])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td><b></b></td>
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
                                        <button onClick={() => toggleContainerState(app.containerId, "stop")}>Stop</button>
                                    ||
                                    app.status === "exited" &&
                                        <button onClick={() => toggleContainerState(app.containerId, "start")}>Start</button>
                                    }
                                </td> 
                                <td>{app.imageName}</td>
                                <td>{app.port}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status === "running" &&
                                        <button onClick={() => openApp(app.port)}>Open</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => deleteContainer(app)}>Delete</button>
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