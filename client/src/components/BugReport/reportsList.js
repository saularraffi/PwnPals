function BugReportsList(prop) {
    const bugReportsList = [{
        title: "Test",
        created: "10/2/2021"
    }]

    return (
        <div>
            <h1>Bug Reports for {prop.appName}</h1>
            <table>
                <thead>
                    <tr>
                        <td><b>Title</b></td>
                        <td><b>Date</b></td>
                    </tr>
                </thead>
                <tbody>
                    {bugReportsList.map((report) => {
                        return (
                            <tr>
                                <td>{report.title}</td>
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