import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getUserId } from '../../auth/userInfo'
import axios from 'axios';

function BugReportFormPage() {
    const location = useLocation();
    const appId = location.pathname.split('/').at(-1)
    const [appData, setAppData] = useState({})
    const [didMount, setDidMount] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorSubmittingReport, setErrorSubmittingReport] = useState(false)

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

    const handleTitleChange = (evt) => {
        setTitle(evt.target.value)
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const url = 'http://localhost:5000/api/bug-report'

        const data = {
            userId: getUserId(),
            title: title,
            description: description,
            imageId: appData.imageId
        }

        axios.post(url, data).then(res => {
            console.log(res)
            window.history.back()
        })
        .catch(err => {
            console.log(err)
            setErrorSubmittingReport(true)
        })
    }

    useEffect(() => {
        fetchContainer()
    }, [didMount])

    return (
        <div>
            <h1>Bug Report for {appData.imageName}</h1>
            {errorSubmittingReport == true &&
                <p>There was an error submitting the report.</p>
            }
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

export default BugReportFormPage