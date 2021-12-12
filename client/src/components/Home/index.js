import {
    Box, 
    Container,
    Typography,
} from '@mui/material'

import { useState } from 'react'
import { getUser } from '../../auth/userInfo'

function HomePage() {
    const [user] = useState(getUser())

    return (
        <Box sx={{ margin: 20 }}>
            <Typography variant='h2'>Hi, {user}!<br />Welcome to PwnPals!</Typography>
        </Box>
    )
}

export default HomePage