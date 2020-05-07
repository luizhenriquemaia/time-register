import React from 'react'


export default function Register() {
    return (
        <div className="content">
            <h1 className="title-page">New Register</h1>
            <label>Name of employee</label>
            <input type="text"/>
            <label>Type of contract</label>
            <input type="text"/>
            <label>Initial date</label>
            <input type="text" />
            <label>Final date</label>
            <input type="text" />
        </div>

    )
}