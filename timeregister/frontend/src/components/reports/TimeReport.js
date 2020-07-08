import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReport } from '../../actions/reports'
import { addTimeReport, getTimeReportWithReport } from '../../actions/timeReport'


export default function TimeReport() {
    const params = useParams()
    const dispatch = useDispatch()
    const report = useSelector(state => state.reports.report)
    const timesOfReport = useSelector(state => state.timeReport.timeReport)
    const idReportParams = params.idReport
    const [idReport, setIdReport] = useState(-1)
    const [nameEmployee, setNameEmployee] = useState('')
    const [dateReport, setDateReport] = useState('')
    const [initialDate, setInitialDate] = useState(new Date(0))
    const [finalDate, setFinalDate] = useState(new Date(0))
    const [daysReport, setDaysReport] = useState([])
    const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const [timesReport, setTimesReport] = useState([])
    const [shouldGetTimes, setShouldGetTimes] = useState(false)
    const [timesState, setTimesState] = useState([])
    const [timeToTemplate, setTimeToTemplate] = useState([])

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
        // the length of the object is undefined so when this is the value the report will be loaded
        if (report.length === undefined) {
            setNameEmployee(report.employee.name)
            const splitInitialDate = report.initialDate.split("-")
            setInitialDate(new Date(splitInitialDate[0], splitInitialDate[1] - 1, splitInitialDate[2]))
            const splitFinallDate = report.finalDate.split("-")
            setFinalDate(new Date(splitFinallDate[0], splitFinallDate[1] - 1, splitFinallDate[2]))
            setDateReport(`${report.initialDate} - ${report.finalDate}`)
            setShouldGetTimes(true)
        }
    }, [report])

    useEffect(() => {
        if (timesOfReport !== undefined) {
            if (timesOfReport.length !== 0) {
                setTimesState(timesOfReport)
                timesOfReport.map(time => {
                    const splitedDateTime = time.dateRegister.split("-")
                    const dateToCheck = new Date(splitedDateTime[0], splitedDateTime[1] - 1, splitedDateTime[2])
                    daysReport.map(date => {
                        if (dateToCheck.getTime() === date.getTime()) {
                            setTimeToTemplate(previousState => [
                                ...previousState,
                                    {
                                        [dateToCheck]:
                                            { [time.schedule_id]: time.timeRegister }                                        
                                        
                                    }
                            ])
                        }
                    })
                })
            }
        }
    }, [timesOfReport])

    console.log(timeToTemplate)
    
    useEffect(() => {
        if (idReport != -1) dispatch(getReport(idReport))
    }, [idReport])

    useEffect(() => {
        if (shouldGetTimes) dispatch(getTimeReportWithReport(idReport))
    }, [shouldGetTimes])

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
        const timesForApi = []
        for (var name  in timesReport) {
            var dateSplited = name.split("-")
            var scheduleReportApi = dateSplited[3]
            var timeSplited = timesReport[name].split(":")
            var dateTimeReportTime = new Date(dateSplited[0], dateSplited[1], dateSplited[2], timeSplited[0], timeSplited[1])
            timesForApi.push({
                dateRegister: `${dateTimeReportTime.getFullYear()}-${dateTimeReportTime.getMonth()}-${dateTimeReportTime.getDate()}`,
                schedule_id: scheduleReportApi,
                timeRegister: `${dateTimeReportTime.getHours()}:${dateTimeReportTime.getMinutes()}`,
                report_id: idReport
            })
        }
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
