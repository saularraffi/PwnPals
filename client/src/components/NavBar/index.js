import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const routeChange = (path) => { 
        navigate(path);
    }

    const logOut = () => {
        localStorage.setItem('loggedIn', false)
        navigate('/')
    }

    if (localStorage.getItem('loggedIn') == 'false') {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <button onClick={() => routeChange('/')}>Home</button>
            <button onClick={() => routeChange('/profile')}>Profile</button>
            <button onClick={() => routeChange('/apps')}>My Apps</button>
            <button onClick={() => routeChange('/upload')}>Upload App</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default NavBar