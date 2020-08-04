import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutUser } from '../../actions/auth'


export default function Logout() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    useEffect(() => {
        if (isAuthenticated) dispatch(logoutUser())
    }, [isAuthenticated])

    if (isAuthenticated) {
        return <h2>Logout...</h2>
    } else {
        return <Redirect to="/login" />
    }
}

