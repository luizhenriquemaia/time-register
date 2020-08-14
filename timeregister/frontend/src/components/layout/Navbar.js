import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export default function Navbar() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return (
            <nav className="navbar-horizontal">
                <ul className="list-navbar">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                </ul>
                <ul className="list-navbar">
                    <li><Link to="/report" className="nav-link">Reports</Link></li>
                    <li><Link to="/logout" className="nav-link">Sign Out</Link></li>
                </ul>
            </nav>
        )
    } else {
        return <nav className="navbar-horizontal"></nav>
    }
}