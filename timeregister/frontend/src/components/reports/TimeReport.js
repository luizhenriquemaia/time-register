import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReport } from '../../actions/reports'
import { addTimeReport } from '../../actions/timeReport'


export default function TimeReport() {
    const params = useParams()
    const dispatch = useDispatch()
    const report = useSelector(state => state.reports.report)
    const idReportParams = params.idReport
    const [idReport, setIdReport] = useState(-1)
    const [nameEmployee, setNameEmployee] = useState('')
    const [dateReport, setDateReport] = useState('')
    const [initialDate, setInitialDate] = useState(new Date(0))
    const [finalDate, setFinalDate] = useState(new Date(0))
    const [daysReport, setDaysReport] = useState([])
    const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const [timesReport, setTimesReport] = useState([])

    useEffect(() => {
        if (finalDate !== new Date(0)) {
            var days = []
            for (var i = new Date(initialDate); i <= finalDate; i.setDate(i.getDate() + 1)) {
                days.push(new Date(i))
            }
            setDaysReport(days)
        }
    }, [finalDate])

    useEffect(() => {
        if (report.length === undefined) {                                                     // the length of the object is undefined so when this is the value the report will be loaded
            setNameEmployee(report.employee.name)
            const splitInitialDate = report.initialDate.split("-")
            setInitialDate(new Date(splitInitialDate[0], splitInitialDate[1] - 1, splitInitialDate[2]))
            const splitFinallDate = report.finalDate.split("-")
            setFinalDate(new Date(splitFinallDate[0], splitFinallDate[1] - 1, splitFinallDate[2]))
            setDateReport(`${report.initialDate} - ${report.finalDate}`)
        }
    }, [report])
    
    useEffect(() => {
        if (idReport != -1) dispatch(getReport(idReport))
    }, [idReport])

    useEffect(() => {
        setIdReport(idReportParams)
    }, [idReportParams])


    const handleChange = e => {
        const { name, value } = e.target
        setTimesReport({
            ...timesReport,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(timesReport)
        const timesForApi = []
        for (var name  in timesReport) {
            var dateSplited = name.split("-")
            var yearReportApi = dateSplited[0]
            var monthReportApi = dateSplited[1]
            var dayReportApi = dateSplited[2]
            var scheduleeReportApi = dateSplited[3]
            timesForApi.push({
                dateRegister: `${yearReportApi}-${monthReportApi}-${dayReportApi}`,
                schedule: scheduleeReportApi,
                timeRegister: timesReport[name],
                report: idReport
            })
        }
        console.log(timesForApi)
        dispatch(addTimeReport(timesForApi))
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
                                <td><input type="time" name={`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-1`} onChange={handleChange}/></td>
                                <td><input type="time" name={`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-2`} onChange={handleChange}/></td>
                                <td><input type="time" name={`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-3`} onChange={handleChange}/></td>
                                <td><input type="time" name={`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-4`} onChange={handleChange}/></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button className="submit-button medium-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
