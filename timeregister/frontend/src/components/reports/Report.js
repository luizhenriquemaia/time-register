import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getReports, deleteReport } from '../../actions/reports'


export default function Report() {
    const dispatch = useDispatch()
    const history = useHistory()
    const reports = useSelector(state => state.reports.report)
    const [reportsState, setReportsState] = useState([{
        id: "",
        initialDate: "",
        finalDate: "",
        employee: "",
        typeContract: ""
    }])

    useEffect(() => {
        if (reports.length !== undefined) setReportsState(reports)
    }, [reports])

    useEffect(() => {
        dispatch(getReports())
    }, [])
    
    const handleDelete = (idReport) => dispatch(deleteReport(idReport))
    const handleClick = (idReport) => history.push(`time-report/${idReport}`)
    

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
                </tbody>
            </table>
        </div>
    )
}