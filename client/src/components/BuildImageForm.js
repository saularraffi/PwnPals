import React, { useState } from "react";
import axios from 'axios';

function BuildImageForm(props) {
    const [owner, setOwner] = useState("user123")
    const [appName, setAppName] = useState("")
    const [githubUri, setGithubUri] = useState("")
    const [githubBranch, setgithubBranch] = useState("")

    const handleAppNameChange = (evt) => {
        setAppName(evt.target.value)
    };

    const handleUriChange = (evt) => {
        setGithubUri(evt.target.value)
    };

    const handleBranchChange = (evt) => {
        setgithubBranch(evt.target.value)
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`submitting github uri: ${githubUri}`)
        console.log(`submitting github branch: ${githubBranch}`)
        console.log(`submitting app name: ${appName}`)

        const options = {
            url: "http://localhost:5000/api/build",
            method: 'POST',
            data: {
                owner: owner,
                imageName: appName,
                uri: githubUri,
                branch: githubBranch
            }
        }
        
        axios.post(options)
        .then(res => {
            console.log(res.status);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>App Name:
                        <input type="text" name="app-name" onChange={handleAppNameChange} />
                    </label>
                <br/>
                <label>GitHub URI:
                    <input type="text" name="github-uri" onChange={handleUriChange} />
                </label>
                <br/>
                <label>Branch:
                    <input type="text" name="github-branch" onChange={handleBranchChange} />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default BuildImageForm;