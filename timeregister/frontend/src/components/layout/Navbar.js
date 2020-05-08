// react things 
import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav className="navbar-vertical">
            <ul className="list-navbar">
                <li><Link to="/" className="nav-link">Home</Link></li>
            </ul>
            <ul className="list-navbar">
                <li><Link to="/new-register" className="nav-link">New Register</Link></li>
                <li><Link to="/reports" className="nav-link">Reports</Link></li>
                <li>Sign Out</li>
            </ul>
        </nav>
    )
}