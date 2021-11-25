import { useNavigate } from "react-router-dom";

import NavBar from "../NavBar";

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
            <h1>Welcome to PwnPals</h1>
        </div>
    )
}

export default HomePage