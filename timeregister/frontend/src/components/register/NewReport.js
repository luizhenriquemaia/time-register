import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEmployees } from '../../actions/employees'
import { getTypeContracts } from '../../actions/typeContract'


export default function NewRegister() {
    // used to referer to dispatch method from redux
    const dispatch = useDispatch()
    // useEffect is similar to component did mount and component did update
    useEffect(() => {
        // get employees for select input
        dispatch(getEmployees())
        dispatch(getTypeContracts())
        // get type of contracts for select input
        
    }, [])
    const employees = useSelector(state => state.employees.employee)
    const typeContracts = useSelector(state => state.typeContracts.typeContract)

    return (
        <div className="content">
            <h1 className="title-page">New Report</h1>
            <form>
                <div className="form-input">
                    <label>Employee</label>
                    <select id="employees">
                        {employees.map(employee => (
                                <option value={employee.id} key={employee.id}>{employee.description}</option>
                            ))}
                    </select>
                    <button className="add-button">+</button>
                </div>
                <div className="form-input">
                    <label>Type of contract</label>
                    <select id="typeContract">
                        {typeContracts.map(typeContract => (
                            <option value={typeContract.id} key={typeContract.id}>{typeContract.description}</option>
                        ))}
                    </select>
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