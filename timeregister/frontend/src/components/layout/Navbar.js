// react things 
import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
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
}