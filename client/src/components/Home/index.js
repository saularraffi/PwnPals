import { getUser } from '../../auth/userInfo'

function HomePage() {
    const user = getUser()

    return (
        <div>
            <h1>Welcome to PwnPals, {user}</h1>
        </div>
    )
}

export default HomePage