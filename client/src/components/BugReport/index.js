import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function BugReportPage() {
    const location = useLocation();
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

    const handleSubmit = () => {
        return
    }

    const handleTitleChange = () => {
        return
    }

    const handleDescriptionChange = () => {
        return
    }

    useEffect(() => {
        fetchContainer()
    }, [didMount])

    return (
        <div>
            <h1>Bug Report for {appData.imageName}</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:
                    <input type="text" name="title" onChange={handleTitleChange} />
                </label>
                <br/>
                <label>Description:
                    <br/>
                    <textarea type="text" name="description" onChange={handleDescriptionChange}></textarea>
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default BugReportPage