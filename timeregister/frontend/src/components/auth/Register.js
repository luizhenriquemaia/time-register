import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Redirect, Link } from 'react-router-dom'
import { registerUser } from '../../actions/auth'


export default function Login() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const [newUserState, setNewUserState] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })
    const statusResponse = useSelector(state => state.info.status)

    const handleOnSubmit = e => {
        e.preventDefault()
        const { username, email, password, password2 } = newUserState
        if (username !== "" && email !== "" && password !== "" && password2 !== "") {
            if (password !== password2) {
                alert.error("passwords do not match")
            } else {
                dispatch(registerUser(newUserState))
            }
        } else {
            alert.error("all fields are required")
        }
    }

    const handleOnChange = e => {
        const { name, value } = e.target
        setNewUserState({
            ...newUserState,
            [name]: value
        })
    }

    if (statusResponse === 201) {
        return <Redirect to='/login' />
    } else {
        return (
            <div className="content login-page show-background-image">
                <div className="login-content">
                    <h1 className="title-page title-login-page">TIME REGISTER</h1>
                    <form className="login-form" onSubmit={handleOnSubmit}>
                        <div className="form-input">
                            <label>Username</label>
                            <input type="text" name="username" value={newUserState.username} onChange={handleOnChange} />
                        </div>
                        <div className="form-input">
                            <label>Email</label>
                            <input type="email" name="email" value={newUserState.email} onChange={handleOnChange} />
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input type="password" name="password" value={newUserState.password} onChange={handleOnChange} />
                        </div>
                        <div className="form-input">
                            <label>Repeat Password</label>
                            <input type="password" name="password2" value={newUserState.password2} onChange={handleOnChange} />
                        </div>
                        <button type="submit" className="submit-button">Register</button>
                    </form>
                    <h4 className="register-link">Already have a user? <Link to="/login">click here to login</Link></h4>
                </div>
            </div>
        )
    }
}

