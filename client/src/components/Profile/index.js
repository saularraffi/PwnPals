import {
    Avatar,
    Typography,
    Box
} from '@mui/material'

import { getUser} from '../../auth/userInfo'
import Table from '../UserApps'

function ProfilePage() {
    return (
        <Box sx={{ margin: 10 }}>
            <Typography variant='h2'>Your Profile</Typography>
            <Table />
        </Box>
    )
}

export default ProfilePage