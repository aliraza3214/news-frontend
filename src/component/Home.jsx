import React from 'react'
import AuthUser from './AuthUser'
import Login from './Login'
import { Toast } from '../util/toast'
import Album from './Album'
import { Box } from '@mui/material'

function Home() {
    const { getToken } = AuthUser()

    if (!getToken()) {
        Toast.fire({
            icon: 'error',
            title: 'Must Login First',
        })
        return <Login />
    }

    return (
        <Box sx={{ width: 2048 }}>
            <Album />
        </Box>
    )
}

export default Home
