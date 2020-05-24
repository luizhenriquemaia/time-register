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
    const [initialDate, setInitialDate] = useState(new Date(0))
    const [finalDate, setFinalDate] = useState(new Date(0))
    const idReportParams = params.idReport
    let report = useSelector(state => state.reports.report)

    useEffect(() => {
        if (finalDate !== new Date(0)) {
            var oneDay = 24 * 60 * 60 * 1000 // hours, minutes, seconds, miliseconds
            const diffDays = Math.round(Math.abs((finalDate - initialDate) / oneDay)) + 1 // count the present day
            console.log(`difference between = ${diffDays}`)
        }
    }, [finalDate])

    useEffect(() => {
        if (report.length !== 0) {
            setNameEmployee(report.employee.name)
            var splitInitialDate = report.initialDate.split("-")
            setInitialDate(new Date(splitInitialDate[0], splitInitialDate[1] - 1, splitInitialDate[2]))
            console.log(`Date set using db and js: ${initialDate}`)
            var splitFinallDate = report.finalDate.split("-")
            setFinalDate(new Date(splitFinallDate[0], splitFinallDate[1] - 1, splitFinallDate[2]))
            console.log(`Date set using db and js: ${finalDate}`)
            setDateReport(`${report.initialDate} - ${report.finalDate}`)
        }
    }, [report])
    
    useEffect(() => {
        if (idReport != 0) {
            dispatch(getReport(idReport))
        }
    }, [idReport])

    useEffect(() => {
        setIdReport(idReportParams)
    }, [idReportParams])

    
    
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