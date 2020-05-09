import React from 'react'


export default function NewRegister() {
    return (
        <div className="content">
            <h1 className="title-page">New Register</h1>
            <form>
                <div className="form-input">
                    <label>Employee</label>
                    <input type="text" />
                    <button className="add-button">+</button>
                </div>
                <div className="form-input">
                    <label>Type of contract</label>
                    <input type="text" />
                    <button className="add-button">+</button>
                </div>
                <div className="form-input">
                    <label>Initial date</label>
                    <input type="text" />
                </div>
                <div className="form-input">
                    <label>Final date</label>
                    <input type="text" />
                </div>
                <button className="submit-button">New Report</button>
            </form>
        </div>

    )
}