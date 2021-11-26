import { getUser } from '../../auth/userInfo'

function ProfilePage() {
    return (
        <div>
            <h1>Profile Page for {getUser()}</h1>
        </div>
    )
}

export default ProfilePage