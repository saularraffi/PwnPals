import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from './table'
import Table2 from '.'


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
  
function UserAppsPage(props) {
    const [appList, setAppList] = useState([])
    const [appCount, setAppCount] = useState(appList.length)
    const [stateChange, setStateChange] = useState()

    const getContainers = async () => {
        const url = "http://localhost:5000/api/container/all"

        await axios.get(url).then(res => {
            setAppList(res.data)
            console.log(res.data)
            console.log("Getting containers")

        }).catch(err => {
            console.log(err)
        })
    }

    const toggleContainerState = async (id, action) => {
        const data = {
            containerId: id
        }

        const url = `http://localhost:5000/api/container/${action}`

        await axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })

        stateChange === true ? setStateChange(false) : setStateChange(true)
    }

    const deleteContainer = async (containerId) => {
        const url = "http://localhost:5000/api/container"

        const data = {
            containerId: containerId
        }

        await axios.delete(url, { data: data }).then(res => {
            getContainers()
        }).catch(err => {
            console.log(err)
        })
    }

    const openApp = function(port) {
        console.log("opening app")
        window.open(`http://localhost:${port}`);
    }

    // useEffect(() => {
    //     getContainers()
    //     sleep(3000).then(() => {
    //         stateChange === true ? setStateChange(false) : setStateChange(true)
    //     })
    // }, [appCount, stateChange])

    useEffect(() => {
        getContainers()
    }, [])

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
                                <td key='toggle-state-btn'>
                                    {app.status === "running" &&
                                        <button onClick={() => toggleContainerState(app.containerId, "stop")}>Stop</button>
                                    ||
                                    app.status === "exited" &&
                                        <button onClick={() => toggleContainerState(app.containerId, "start")}>Start</button>
                                    }
                                </td>
                                <td key={app.imageName}>
                                    <a href={`../app/${app._id}`}>{app.imageName}</a>
                                </td>
                                <td key={app.port}>{app.port}</td>
                                <td key={app.status}>{app.status}</td>
                                <td key='open-app-btn'>
                                    {app.status === "running" &&
                                        <button onClick={() => openApp(app.port)}>Open</button>
                                    }
                                </td>
                                <td key='delete-app-btn'>
                                    <button onClick={() => deleteContainer(app.containerId)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* <Table apps={appList}/> */}
            <Table2 />
        </div>
    )
}

export default UserAppsPage;