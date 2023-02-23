import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import AuthUser from './AuthUser'
import { Button } from '@material-ui/core'
import { Toast } from '../util/toast'
import Login from './Login'
import { Link } from 'react-router-dom'

const Setting = () => {
    const { logout, getToken } = AuthUser()

    if (!getToken()) {
        Toast.fire({
            icon: 'error',
            title: 'Must Login First',
        })
        return <Login />
    }
    return (
        <>
            <CssBaseline />

            <AppBar position="static" color="black">
                <Toolbar>
                    <Button onClick={logout} color="inherit">
                        logout
                    </Button>
                    <Link
                        to="/home"
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            fontSize: '16px',
                            fontWeight: 'semibold',
                        }}
                    >
                        Home
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Setting
