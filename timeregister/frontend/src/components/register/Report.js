import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReports } from '../../actions/reports'


export default function Report() {
    const [reportsState, setReportsState] = useState({
        initialDate: "",
        finalDate: "",
        employee: "",
        typeContract: ""
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReports())
    }, [])
    const reports = useSelector(state => state.reports.report)

    console.log(reports)
    return (
        <div className="content">
            <h1 className="title-page">Report</h1>
            <table>
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
                        <tr key={report.id}>
                            <td>{report.initialDate}</td>
                            <td>{report.finalDate}</td>
                            <td>{report.employee}</td>
                            <td>{report.typeContract}</td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul>
                {reports.map(report => (
                    <li key={report.id}>
                        <strong>Initial Date</strong>
                        <p>{report.initialDate}</p>
                        <strong>Final Date</strong>
                        <p>{report.finalDate}</p>
                        <strong>Employee</strong>
                        <p>{report.employee}</p>
                        <strong>Type of Contract</strong>
                        <p>{report.typeContract}</p>
                        <button>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}