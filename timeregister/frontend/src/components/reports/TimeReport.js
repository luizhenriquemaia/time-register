import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// actions
import { getReport } from '../../actions/reports'



export default function TimeReport() {
    const params = useParams()
    const dispatch = useDispatch()
    const [idReport, setIdReport] = useState(-1)
    const [nameEmployee, setNameEmployee] = useState('')
    const [dateReport, setDateReport] = useState('')
    const [initialDate, setInitialDate] = useState(new Date(0))
    const [finalDate, setFinalDate] = useState(new Date(0))
    const idReportParams = params.idReport
    const report = useSelector(state => state.reports.report)
    const [daysReport, setDaysReport] = useState([])
    const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const [timesReport, setTimesReport] = useState([])

    useEffect(() => {
        if (finalDate !== new Date(0)) {
            //var oneDay = 24 * 60 * 60 * 1000                                                // hours, minutes, seconds, miliseconds
            //const diffDays = Math.round(Math.abs((finalDate - initialDate) / oneDay)) + 1   // count the initial day
            // set the array of days to map in template
            var days = []
            var j = 0
            for (var i = new Date(initialDate); i <= finalDate; i.setDate(i.getDate() + 1)) {
                days.push(new Date(i))
                j++
            }
            setDaysReport(days)
        }
    }, [finalDate])

    useEffect(() => {
        if (report.length === undefined) {                                                     // the length of the object is undefined so when this is the value the report will be loaded
            setNameEmployee(report.employee.name)
            var splitInitialDate = report.initialDate.split("-")
            setInitialDate(new Date(splitInitialDate[0], splitInitialDate[1] - 1, splitInitialDate[2]))
            var splitFinallDate = report.finalDate.split("-")
            setFinalDate(new Date(splitFinallDate[0], splitFinallDate[1] - 1, splitFinallDate[2]))
            setDateReport(`${report.initialDate} - ${report.finalDate}`)
        }
    }, [report])
    
    useEffect(() => {
        if (idReport != -1) {
            dispatch(getReport(idReport))
        }
    }, [idReport])

    useEffect(() => {
        setIdReport(idReportParams)
    }, [idReportParams])

    // handle actions of page
    const handleChange = e => {
        setTimesReport({
            ...timesReport,
            [e.target.name]: e.target.value
        })
        console.log(e.target.value)
        console.log(timesReport)
    }
    
    
    return (
        <div className="content">
            <h1 className="title-page">Time Report Of {nameEmployee}</h1>
            <h4 className="text-date-report">Date: {dateReport}</h4>
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
                    {daysReport.map((date, i) => (
                            <tr key={i}>
                                <td>
                                {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} - ${daysWeek[date.getDay()]}`}
                                </td>
                                <td><input type="time" name={`${i}0`} onChange={handleChange}/></td>
                                <td><input type="time" name={`${i}1`} onChange={handleChange}/></td>
                                <td><input type="time" name={`${i}2`} onChange={handleChange}/></td>
                                <td><input type="time" name={`${i}3`} onChange={handleChange}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button className="submit-button medium-button">Submit</button>
        </div>
    )
}
