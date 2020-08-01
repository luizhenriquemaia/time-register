import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


export default function Login() {
    const dispatch = useDispatch()
    const [loginState, setLoginState] = useState({
        username: "",
        password: ""
    })
    //const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


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

    /* if (isAuthenticated) {
        return <Redirect to="/" />
    } else {
        return (
            <main className="content login">
                <section className="section-main-box login-section">
                    <div className="content-box">
                        <form className="data-box" onSubmit={handleOnSubmit}>
                            <label>Nome</label>
                            <input type="text" name="username" value={loginState.username} onChange={handleOnChange} />
                            <label>Senha</label>
                            <input type="password" name="password" value={loginState.password} onChange={handleOnChange} />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </section>
            </main>
        )

    } */
    return (
        <div className="content login-page show-background-image">
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
        </div>
    )
}

