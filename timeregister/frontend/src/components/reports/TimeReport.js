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
    const [typeContractOfReport, setTypeContractOfReport] = useState('')
    const [initialDate, setInitialDate] = useState(new Date(0))
    const [finalDate, setFinalDate] = useState(new Date(0))
    const [daysReport, setDaysReport] = useState([])
    const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const [timesReport, setTimesReport] = useState([])
    const [shouldGetTimes, setShouldGetTimes] = useState(false)
    const [timesState, setTimesState] = useState([])
    const [totalHoursDay, setTotalHoursDay] = useState([])
    const [totalNormalHours, setTotalNormalHours] = useState([])
    const [totalExtraHours50, setTotalExtraHours50] = useState([])
    const [totalExtraHours100, setTotalExtraHours100] = useState([])

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
        if (report.length === undefined) {
            setNameEmployee(report.employee.name)
            const splitInitialDate = report.initialDate.split("-")
            setInitialDate(new Date(splitInitialDate[0], splitInitialDate[1] - 1, splitInitialDate[2]))
            const splitFinallDate = report.finalDate.split("-")
            setFinalDate(new Date(splitFinallDate[0], splitFinallDate[1] - 1, splitFinallDate[2]))
            setDateReport(`${report.initialDate} - ${report.finalDate}`)
            setTypeContractOfReport(report.typeContract.description)
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

    // function to transform a string of hours in a date object
    const transformHours = (stringHour) => {
        let splitedHours = stringHour.split(":")
        return new Date(0, 0, 0, splitedHours[0], splitedHours[1])
    }

    // function to round value
    const roundWithDecimals = (value, numberOfDecimals) => {
        return Math.round(value * Math.pow(10, numberOfDecimals)) / Math.pow(10, 2)
    }

    // function to check if a time is bigger that other
    const time1IsBiggerThanTime0 = (time0, time1) => {
        return transformHours(time1).getTime() > transformHours(time0).getTime() ? true : false
    }

    // function to get diference between 2 time objects
    const differenceBetweenTimes = (time0, time1) => {
        let totalHour = 0
        totalHour = transformHours(time1).getTime() - transformHours(time0).getTime()
        return totalHour = totalHour / 1000 / 3600
    }

    // function to return total of hours, extra hours 50% and extra hours 100%
    const getHoursPerDay = (time0, time1, time2, time3, dayOfTime) => {
        let totalHour = 0
        let totalNormalHours = 0
        let totalExtra50 = 0
        let totalExtra100 = 0
        switch (typeContractOfReport) {
            case "Segunda a sábado com hora extra e almoço de 1:00hr":
                if (time1IsBiggerThanTime0(time0, time1)) totalHour = differenceBetweenTimes(time0, time1)
                if (time1IsBiggerThanTime0(time2, time3)) totalHour += differenceBetweenTimes(time2, time3)
                if (daysReport[dayOfTime].getDay() === 0) {
                    if (time1IsBiggerThanTime0(time0, time1)) totalExtra100 = differenceBetweenTimes(time0, time1)
                    if (time1IsBiggerThanTime0(time2, time3)) totalExtra100 += differenceBetweenTimes(time2, time3)
                } else if (daysReport[dayOfTime].getDay() === 6) {
                    if (time1IsBiggerThanTime0(time0, time1)) {
                        totalNormalHours = differenceBetweenTimes(time0, time1)
                        if (totalNormalHours > 5) {
                            totalExtra50 = totalNormalHours - 5
                            totalNormalHours = 5
                        }
                    }
                    if (time1IsBiggerThanTime0(time2, time3)) {
                        totalNormalHours += differenceBetweenTimes(time2, time3)
                        if (totalNormalHours > 5) {
                            totalExtra50 = totalNormalHours - 5
                            totalNormalHours = 5
                        }
                    }
                } else {
                    if (time1IsBiggerThanTime0(time0, time1)) {
                        totalNormalHours = differenceBetweenTimes(time0, time1)
                        if (totalNormalHours > 8) {
                            totalExtra50 = totalNormalHours - 8
                            totalNormalHours = 8
                        }
                    }
                    if (time1IsBiggerThanTime0(time2, time3)) {
                        totalNormalHours += differenceBetweenTimes(time2, time3)
                        if (totalNormalHours > 8) {
                            totalExtra50 = totalNormalHours - 8
                            totalNormalHours = 8
                        }
                    }
                }
                break
            default:
                console.log("HAVE TO MAKE THIS TYPE OF CONTRACT CASE")
        }
        return [roundWithDecimals(totalHour, 2), roundWithDecimals(totalNormalHours, 2), roundWithDecimals(totalExtra50, 2), roundWithDecimals(totalExtra100, 2)]
    }

    // set total of hours to state
    useEffect(() => {
        if (timesReport != null && timesReport.length !== 0) {
            let dataToTotalHoursState = []
            daysReport.map(day => {
                dataToTotalHoursState.push(timesReport.filter(
                    time => new Date(time.name.split("-")[0], time.name.split("-")[1] - 1, time.name.split("-")[2]).getTime() === day.getTime()
                ))
            })
            let totalHoursWorkDay = []
            let totalNormalHours = []
            let totalExtraHours50 = []
            let totalExtraHours100 = []
            let hoursPerDay = []
            dataToTotalHoursState.map((data, i) => {
                hoursPerDay = getHoursPerDay(data[0].time, data[1].time, data[2].time, data[3].time, i)
                totalHoursWorkDay.push(hoursPerDay[0])
                totalNormalHours.push(hoursPerDay[1])
                totalExtraHours50.push(hoursPerDay[2])
                totalExtraHours100.push(hoursPerDay[3])
                })
            setTotalHoursDay(totalHoursWorkDay)
            setTotalNormalHours(totalNormalHours)
            setTotalExtraHours50(totalExtraHours50)
            setTotalExtraHours100(totalExtraHours100)
        }
    }, [timesReport])
    console.log(totalHoursDay)
    console.log(totalNormalHours)
    console.log(totalExtraHours50)
    console.log(totalExtraHours100)

    
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
            <label>Total of Worked Hours:
                {totalHoursDay.length !== 0 ? 
                    <input type="text" value={roundWithDecimals(totalHoursDay.reduce((a, b) => a + b, 0), 2)} readOnly /> : 
                    <input type="text" value="0" readOnly />
                }
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Entry</th>
                        <th>Entry Lunch</th>
                        <th>Out Lunch</th>
                        <th>Out</th>
                        <th>Total Hours</th>
                        <th>Total Normal Hours</th>
                        <th>Total Extra 50%</th>
                        <th>Total Extra 100%</th>
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
                                    <td>
                                        {totalHoursDay.length !== 0 ?
                                            <input type="text" value={totalHoursDay[i]} readOnly /> :
                                            <input type="text" value="0.00" readOnly />
                                        }
                                    </td>
                                    <td>
                                        {totalNormalHours.length !== 0 ?
                                            <input type="text" value={totalNormalHours[i]} readOnly /> :
                                            <input type="text" value="0.00" readOnly />
                                        }
                                    </td>
                                    <td>
                                        {totalExtraHours50.length !== 0 ?
                                            <input type="text" value={totalExtraHours50[i]} readOnly /> :
                                            <input type="text" value="0.00" readOnly />
                                        }
                                    </td>
                                    <td>
                                        {totalExtraHours100.length !== 0 ?
                                            <input type="text" value={totalExtraHours100[i]} readOnly /> :
                                            <input type="text" value="0.00" readOnly />
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : <tr></tr>
                    }
                </tbody>
            </table>
            <button className="submit-button medium-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}