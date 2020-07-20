import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEmployees } from '../../actions/employees'
import { getTypeContracts } from '../../actions/typeContract'
import { getReports, addReport, deleteReport } from '../../actions/reports'


export default function Report() {
    const dispatch = useDispatch()
    const history = useHistory()
    const reports = useSelector(state => state.reports.report)
    const employees = useSelector(state => state.employees.employee)
    const typeContracts = useSelector(state => state.typeContracts.typeContract)
    const [reportsState, setReportsState] = useState([{
        id: "",
        initialDate: "",
        finalDate: "",
        employee: "",
        typeContract: ""
    }])
    const [newReportState, setNewReportState] = useState({
        initialDate: "",
        finalDate: "",
        employee: "",
        typeContract: ""
    })

    useEffect(() => {
        if (reports.length !== undefined) setReportsState(reports)
    }, [reports])

    useEffect(() => {
        dispatch(getReports())
        dispatch(getEmployees())
        dispatch(getTypeContracts())
    }, [])
    
    const handleDelete = (idReport) => dispatch(deleteReport(idReport))

    const handleClick = (idReport) => history.push(`time-report/${idReport}`)

    const handleChange = e => {
        const { name, value } = e.target
        setNewReportState({
            ...newReportState,
            [name]: value
        })
    }

    const handleAddReport = e => {
        const { initialDate, finalDate, } = newReportState
        const employee_id = newReportState["employee"]
        const typeContract_id = newReportState["typeContract"]
        const newReport = { employee_id, typeContract_id, initialDate, finalDate }
        dispatch(addReport(newReport))
    }
    

    return (
        <div className="content hidden-background">
            <h1 className="title-page">Report</h1>
            <table className="table-reports">
                <thead>
                    <tr>
                        <th>Initial Date</th>
                        <th>Final Date</th>
                        <th>Employee</th>
                        <th>Type of Contract</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reportsState.map(report => (
                        <tr key={report.id} >
                            <td onClick={() => handleClick(report.id)} >{report.initialDate}</td>
                            <td>{report.finalDate}</td>
                            <td>{report.employee.name}</td>
                            <td>{report.typeContract.description}</td>
                            <td><button onClick={() => handleDelete(report.id)}>Delete</button></td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input type="date" name="initialDate" onChange={handleChange}/>
                        </td>
                        <td>
                            <input type="date" name="finalDate" onChange={handleChange} />
                        </td>
                        <td>
                            <select id="employees" name="employee" onChange={handleChange}>
                                <option value="0"></option>
                                {employees.map(employee => (
                                    <option value={employee.id} key={employee.id}>{employee.name} - {employee.function}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <select id="typeContract" name="typeContract" onChange={handleChange}>
                                <option value="0"></option>
                                {typeContracts.map(typeContract => (
                                    <option value={typeContract.id} key={typeContract.id}>{typeContract.description}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button onClick={() => handleAddReport()}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}