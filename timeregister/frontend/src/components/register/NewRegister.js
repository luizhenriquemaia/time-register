import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEmployees } from '../../actions/employees'


export default function NewRegister() {
    // used to referer to dispatch method from redux
    const dispatch = useDispatch()
    // useEffect is similar to component did mount and component did update
    useEffect(() => {
        dispatch(getEmployees())
    }, [])
    const employees = useSelector(state => state.employees.employee)
    console.log(employees)
/*{ { employees.map(employee => (
                        <option value="{employee.description}" key="{employee.id}"></option>
                    ))} }*/
    /* <table>
                    <tbody>
                        {this.state.employees.map(employee => (
                            <tr key="{employee.id}">
                                <td>{employee.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */
    return (
        <div className="content">
            <h1 className="title-page">New Register</h1>
            <form>
                <div className="form-input">
                    <label>Employee</label>
                    <select id="employees">
                        {employees.map(employee => (
                                <option value="{employee.id}" key="{employee.id}">{employee.description}</option>
                            ))}
                    </select>
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