import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEmployees } from '../../actions/employees'
import { getTypeContracts } from '../../actions/typeContract'
import { addReport } from '../../actions/reports'


export default function NewRegister() {
    const [newReportState, setNewReportState] = useState({
        employee: "",
        typeContract: "",
        initialDate: "",
        finalDate: ""
    })

    // used to referer to dispatch method from redux
    const dispatch = useDispatch()
    const history = useHistory()
    // useEffect is similar to component did mount and component did update
    useEffect(() => {
        // get employees for select input
        dispatch(getEmployees())
        // get type of contracts for select input
        dispatch(getTypeContracts())
    }, [])
    const employees = useSelector(state => state.employees.employee)
    const typeContracts = useSelector(state => state.typeContracts.typeContract)

    // send values from the form to state
    const handleChange = e => {
        const { name, value } = e.target
        setNewReportState({
            ...newReportState,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { initialDate, finalDate, } = newReportState
        const employee_id = newReportState["employee"]
        const typeContract_id = newReportState["typeContract"]
        const newReport = { employee_id, typeContract_id, initialDate, finalDate }
        // to do -> if the values in newReport != initial Report
        dispatch(addReport(newReport))
        history.push('/report')
    }


    return (
        <div className="content">
            <h1 className="title-page">New Report</h1>
            <form onSubmit={handleSubmit} >
                <div className="form-input">
                    <label>Employee</label>
                    <select id="employees" name="employee" onChange={handleChange}>
                        <option value="0"></option>
                        {employees.map(employee => (
                                <option value={employee.id} key={employee.id}>{employee.name} - {employee.function}</option>
                            ))}
                    </select>
                    <button className="add-button">+</button>
                </div>
                <div className="form-input">
                    <label>Type of contract</label>
                    <select id="typeContract" name="typeContract" onChange={handleChange}>
                        <option value="0"></option>
                        {typeContracts.map(typeContract => (
                            <option value={typeContract.id} key={typeContract.id}>{typeContract.description}</option>
                        ))}
                    </select>
                    <button className="add-button">+</button>
                </div>
                <div className="form-input">
                    <label>Initial date</label>
                    <input type="date" name="initialDate" onChange={handleChange} />
                </div>
                <div className="form-input">
                    <label>Final date</label>
                    <input type="date" name="finalDate" onChange={handleChange} />
                </div>
                <button className="submit-button">New Report</button>
            </form>
        </div>
    )
}