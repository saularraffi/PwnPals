import { useNavigate } from "react-router-dom";
import { logOut } from '../../auth/userInfo'

function NavBar() {
    const navigate = useNavigate();

    const routeChange = (path) => { 
        navigate(path);
    }

    const logUserOut = () => {
        logOut()
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
            <button onClick={logUserOut}>Log Out</button>
        </div>
    )
}

export default NavBar