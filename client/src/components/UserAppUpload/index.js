import React, { useState } from "react";
import axios from 'axios';
import { getUser } from '../../auth/userInfo'

function UserAppUploadPage(props) {
    const [user] = useState(getUser())
    const [appName, setAppName] = useState("")
    const [githubUri, setGithubUri] = useState("")

    const handleAppNameChange = (evt) => {
        setAppName(evt.target.value)
    };

    const handleUriChange = (evt) => {
        setGithubUri(evt.target.value)
    };

    const apiBuildImage = () => {
        const url = "http://localhost:5000/api/build"
        const data = {
            "user": user,
            "imageName": appName,
            "repo": githubUri
        }
        
        axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })
    }

    const apiRunContainer = () => {
        const url = "http://localhost:5000/api/container/create"
        const data = {
            "user": user,
            "imageName": appName
        }
        
        axios.post(url, data).then(res => {
            console.log(res.status);
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`submitting github uri: ${githubUri}`)
        console.log(`submitting app name: ${appName}`)

        // apiBuildImage()
        apiRunContainer()
    }

    return (
        <div>
            <h1>Upload your app</h1>
            <form onSubmit={handleSubmit}>
                <label>App Name:
                        <input type="text" name="app-name" onChange={handleAppNameChange} />
                    </label>
                <br/>
                <label>GitHub URI:
                    <input type="text" name="github-uri" onChange={handleUriChange} />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default UserAppUploadPage;