import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// actions
import { getReport } from '../../actions/reports'



export default function TimeReport() {
    const params = useParams()
    const dispatch = useDispatch()
    const [idReport, setIdReport] = useState(0)
    const [nameEmployee, setNameEmployee] = useState('')
    const [dateReport, setDateReport] = useState('')
    const idReportParams = params.idReport
    let report = useSelector(state => state.reports.report)
    
    console.log(idReport)

    useEffect(() => {
        if (idReport != 0) {
            dispatch(getReport(idReport))
        }
    }, [idReport])

    useEffect(() => {
        setIdReport(idReportParams)
    }, [idReportParams])

    useEffect(() => {
        console.log(`report length: ${report.length}`)
        if (report.length !== 0) {
            console.log("passes")
            setNameEmployee(report.employee.name)
            setDateReport(`${report.initialDate} - ${report.finalDate}`)
        }
    }, [report])

    console.log(report)

    
    
    return (
        <div className="content">
            <h1 className="title-page">Time Report Of {nameEmployee}</h1>
            <h5>Date: {dateReport}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Entry</th>
                        <th>Entry Lunch</th>
                        <th>Out Lunch</th>
                        <th>Out</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01/01/2020</td>
                        <td>08:00</td>
                        <td>12:00</td>
                        <td>13:00</td>
                        <td>18:00</td>
                    </tr>
                    <tr>
                        <td><input type="date"/></td>
                        <td><input type="time" /></td>
                        <td><input type="time" /></td>
                        <td><input type="time" /></td>
                        <td><input type="time" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}