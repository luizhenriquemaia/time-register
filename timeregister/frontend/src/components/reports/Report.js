import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getReports, deleteReport, getReport } from '../../actions/reports'


export default function Report() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getReports())
    }, [])
    const reports = useSelector(state => state.reports.report)

    function handleDelete (idReport) {
        console.log("deleting report")
        dispatch(deleteReport(idReport))
    }

    function handleClick(idReport) {
        //console.log(`report clicked: ${idReport}`)
        // send the choosen report to state
        //dispatch(getReport(idReport))
        history.push(`time-report/${idReport}`)
    }
    
    return (
        <div className="content">
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
                    {reports.map(report => (
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