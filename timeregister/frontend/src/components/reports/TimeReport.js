import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReport } from '../../actions/reports'
import { addTimeReport, getTimeReportWithReport } from '../../actions/timeReport'



export default function TimeReport() {
    const params = useParams()
    const dispatch = useDispatch()
    const defaultTime = new Date(0, 0, 0, 0, 0)
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
    //const [timeToTemplate, setTimeToTemplate] = useState([])

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
            }
        }
    }, [timesOfReport])

    useEffect(() => {
        if (timesState != null) {
            daysReport.map(date => {
                var nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-1`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 1)
                var nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-2`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 2)
                var nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-3`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 3)
                var nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-4`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 4)
            })
        }
    }, [timesState])

    const checkIfDateIsSameAndReturnTime = (name, date, scheduleToCheck) => {
        var timesChecked = timesState.map(time => {
            var splitedDateTime = time.dateRegister.split("-")
            var dateToCheck = new Date(splitedDateTime[0], splitedDateTime[1] - 1, splitedDateTime[2])
            if (date.getTime() === dateToCheck.getTime()) {
                if (time.schedule_id === scheduleToCheck) return time.timeRegister
            }
        })
        var timeToAddToState = timesChecked.filter(time => (time != null))
        if (timeToAddToState.length === 0) timeToAddToState = ["00:00:00"]
        setTimesReport(prevState => [
            ...prevState,
            {
                ["name"]: name,
                ["time"]: timeToAddToState[0]
            }]
        )
    }

    
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
        var idTimeInTimesReport = 0
        var timesReportCopy = [...timesReport]
        timesReport.map(time => {
            if (time.name === name) {
                timesReportCopy[idTimeInTimesReport].time = value
            }
            idTimeInTimesReport += 1
        })
        setTimesReport(timesReportCopy)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const timesForApi = []
        for (var timeOfState  in timesReport) {
            var dateSplited = timesReport[timeOfState].name.split("-")
            var scheduleReportApi = dateSplited[3]
            var timeSplited = timesReport[timeOfState].time.split(":")
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
                    {timesReport !== undefined && timesReport != null && timesReport.length !== 0 ? 
                        (daysReport.map((date, i) => (
                                <tr key={i}>
                                    <td>
                                        {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} - ${daysWeek[date.getDay()]}`}
                                    </td>
                                    <td>
                                        <input 
                                            type="time" 
                                            name={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-1`} 
                                            onChange={handleChange}
                                            value={
                                                timesReport.filter(
                                                    time => time.name === `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-1` && time != null
                                                )[0].time
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="time" 
                                            name={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-2`} 
                                            onChange={handleChange}
                                            value={
                                                timesReport.filter(
                                                    time => time.name === `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-2` && time != null
                                                )[0].time
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="time" 
                                            name={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-3`} 
                                            onChange={handleChange}
                                            value={
                                                timesReport.filter(
                                                    time => time.name === `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-3` && time != null
                                                )[0].time
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="time" 
                                            name={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-4`} 
                                            onChange={handleChange}
                                            value={
                                                timesReport.filter(
                                                    time => time.name === `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-4` && time != null
                                                )[0].time
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : <td></td>
                    }
                </tbody>
            </table>
            <button className="submit-button medium-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}