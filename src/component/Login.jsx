import loginImg from './login.svg'
import './style.scss'
import { useState } from 'react'
import AuthUser from './AuthUser'
import { Link } from 'react-router-dom'
import Project from './Home'
import { Toast } from '../util/toast'
import Button from '@mui/material/Button'

export default function Login() {
    const { http, setToken, getToken } = AuthUser()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    if (!getToken()) {
        const login = () => {
            http.post('/login', {
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
                    <div className="header">Login</div>
                    <div className="content">
                        <div className="image">
                            <img src={loginImg} alt={'Computer'} />
                        </div>
                        <div className="form">
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
                            onClick={login}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="card-footer">
                        Have not register yet !{' '}
                        <Link to="/register">Register Here</Link>
                    </div>
                </div>
            </div>
        )
    }
    return <Project />
}
