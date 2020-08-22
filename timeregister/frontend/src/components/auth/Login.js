import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { loginUser } from '../../actions/auth'


export default function Login() {
    const dispatch = useDispatch()
    const [loginState, setLoginState] = useState({
        username: "",
        password: ""
    })
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


    const handleOnSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(loginState.username, loginState.password))

    }

    const handleOnChange = e => {
        const { name, value } = e.target
        setLoginState({
            ...loginState,
            [name]: value
        })
    }

    if (isAuthenticated) {
        return <Redirect to="/" />
    } else {
        return (
            <div className="content login-page show-background-image">
                <div className="login-content">
                    <h1 className="title-page title-login-page">TIME REGISTER</h1>
                    <form className="login-form" onSubmit={handleOnSubmit}>
                        <div className="form-input">
                            <label>Email</label>
                            <input type="text" name="username" value={loginState.username} onChange={handleOnChange} />
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input type="password" name="password" value={loginState.password} onChange={handleOnChange} />
                        </div>
                        <button type="submit" className="submit-button">Login</button>
                    </form>
                    <h4 className="register-link">Don't have a user yeet? <Link to="/register">click here to register</Link></h4>
                </div>
            </div>
        )
    }
}

