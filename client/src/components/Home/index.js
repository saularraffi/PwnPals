import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const routeChange = (path) => { 
        navigate(path);
    }

    const logOut = () => {
        localStorage.setItem('loggedIn', false)
        navigate('/')
    }

    return (
        <div>
            <h1>This is the home page</h1>
            <button onClick={() => routeChange('/profile')}>Profile</button>
            <button onClick={() => routeChange('/apps')}>My Apps</button>
            <button onClick={() => routeChange('/upload')}>Upload App</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default HomePage