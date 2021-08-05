import React, { useEffect, useState } from "react";
import axios from 'axios';

function AppList(props) {
    const [startStopButton, setStartStopButton] = useState()
    const [appList, setAppList] = useState([])
    const [appCount, setAppCount] = useState(appList.length)

    const apiGetContainer = async () => {
        const url = "http://localhost:5000/api/container"

        await axios.get(url).then(res => {
            setAppList(res.data)

        }).catch(err => {
            console.log(err)
        })
    }

    const toggleContainerState = (evt) => {
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

        axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })
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
    }

    useEffect(() => {
        apiGetContainer()
    }, [appCount])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>Name</td>
                        <td>Port</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {appList.map((app) => {
                        return (
                            <tr>
                                <td>
                                    {app.status === "up" &&
                                        <button onClick={toggleContainerState}>Stop</button>
                                    ||
                                    app.status === "down" &&
                                        <button onClick={toggleContainerState}>Start</button>
                                    }
                                </td> 
                                <td>{app.imageName}</td>
                                <td>{app.port}</td>
                                <td>{app.status}</td>
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

export default AppList;