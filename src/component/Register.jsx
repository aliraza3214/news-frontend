import loginImg from './login.svg'
import './style.scss'
import { Link } from 'react-router-dom'
import AuthUser from './AuthUser'
import React, { useState } from 'react'
import Project from './Home'
import { Toast } from '../util/toast'
import { Button } from '@mui/material'

export default function Register() {
    const { http, setToken, getToken } = AuthUser()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    if (!getToken()) {
        const submitForm = () => {
            http.post('/register', {
                name: name,
                email: email,
                password: password,
            })
                .then((res) => {
                    setToken(res.data.user, res.data.access_token)
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        Toast.fire({
                            icon: 'error',
                            title: error.response.data.message,
                        })
                    }
                })
        }
        return (
            <div className="base-container">
                <div className="card">
                    <div className="header">Register</div>
                    <div className="content">
                        <div className="image">
                            <img src={loginImg} alt={'Computer'} />
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="username"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submitForm}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="card-footer">
                        Already have a account <Link to="/">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }
    return <Project />
}
