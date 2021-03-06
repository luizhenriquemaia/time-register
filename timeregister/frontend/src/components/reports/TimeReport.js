import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReport } from '../../actions/reports'
import { addTimeReport, getTimeReportWithReport } from '../../actions/timeReport'


export default function TimeReport() {
    const params = useParams()
    const dispatch = useDispatch()
    const idReportParams = params.idReport
    const report = useSelector(state => state.reports.report)
    const timesOfReport = useSelector(state => state.timeReport.timeReport)
    const isReportsFromReportsComponent = useSelector(state => state.reports.isListOfReports)
    const [reportFromBackEnd, setReportFromBackEnd] = useState({
        "employeeName": "",
        "typeOfContract": "",
        "intialDate": "",
        "finalDate": "",
        "shortDates": ""
    })
    const [daysReport, setDaysReport] = useState([])
    const daysWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const [isComponentDataLoading, setIsComponentDataLoading] = useState(true)
    const [responseFromAPIIsEmpty, setResponseFromAPIIsEmpty] = useState(false)
    const [timesReport, setTimesReport] = useState([])
    const [shouldGetTimes, setShouldGetTimes] = useState(false)
    const [timesState, setTimesState] = useState([])
    const [totalHoursDay, setTotalHoursDay] = useState([])
    const [totalNormalHours, setTotalNormalHours] = useState([])
    const [totalExtraHours50, setTotalExtraHours50] = useState([])
    const [totalExtraHours100, setTotalExtraHours100] = useState([])


    useEffect(() => {
        dispatch(getReport(idReportParams))
        setIsComponentDataLoading(true)
        setResponseFromAPIIsEmpty(false)
    }, [])

    // set report from backend state
    useEffect(() => {
        if (!isReportsFromReportsComponent) {
            if (report != null && report.length !== 0) {
                const splitInitialDate = report.initialDate.split("-")
                const splitFinallDate = report.finalDate.split("-")
                setReportFromBackEnd({
                    "employeeName": report.employee.name,
                    "initialDate": new Date(splitInitialDate[0], splitInitialDate[1] - 1, splitInitialDate[2]),
                    "finalDate": new Date(splitFinallDate[0], splitFinallDate[1] - 1, splitFinallDate[2]),
                    "shortDates": `${report.initialDate} - ${report.finalDate}`,
                    "typeOfContract": report.typeContract.description,
                    "hoursSunday": report.typeContract.hoursSunday,
                    "hoursMonday": report.typeContract.hoursMonday,
                    "hoursTuesday": report.typeContract.hoursTuesday,
                    "hoursWednesday": report.typeContract.hoursWednesday,
                    "hoursThursday": report.typeContract.hoursThursday,
                    "hoursFriday": report.typeContract.hoursFriday,
                    "hoursSaturday": report.typeContract.hoursSaturday
                })
                setShouldGetTimes(true)
            }
        }
    }, [report])

    // set dates between the final date and initial date of report from backend
    useEffect(() => {
        if (reportFromBackEnd.finalDate != null && reportFromBackEnd.finalDate !== "") {
            let days = []
            for (let i = new Date(reportFromBackEnd.initialDate); i <= reportFromBackEnd.finalDate; i.setDate(i.getDate() + 1)) {
                days.push(new Date(i))
            }
            setDaysReport(days)
        }
    }, [reportFromBackEnd])

    // get times of report
    useEffect(() => {
        if (shouldGetTimes) dispatch(getTimeReportWithReport(idReportParams))
    }, [shouldGetTimes])

    // set time state
    useEffect(() => {
        if (timesOfReport != undefined && timesOfReport.length !== 0) {
            setTimesState(timesOfReport)
        } else if (timesOfReport === '') {
            setResponseFromAPIIsEmpty(true)
            setIsComponentDataLoading(false)
        }
    }, [timesOfReport])


    // check what times has values from backend
    useEffect(() => {
        if (timesState != null || responseFromAPIIsEmpty) {
            setIsComponentDataLoading(true)
            setTimesReport([])
            daysReport.map(date => {
                let nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-1`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 1)
                nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-2`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 2)
                nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-3`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 3)
                nameToCheckDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-4`
                checkIfDateIsSameAndReturnTime(nameToCheckDate, date, 4)
            })
        }
    }, [timesState, daysReport])


    const checkIfDateIsSameAndReturnTime = (name, date, scheduleToCheck) => {
        let timesChecked = timesState.map(time => {
            let splitedDateTime = time.dateRegister.split("-")
            let dateToCheck = new Date(splitedDateTime[0], splitedDateTime[1] - 1, splitedDateTime[2])
            if (date.getTime() === dateToCheck.getTime()) {
                if (time.schedule === scheduleToCheck) return time.timeRegister
            }
        })
        let timeToAddToState = timesChecked.filter(time => (time != null))
        if (timeToAddToState.length === 0) timeToAddToState = ["00:00:00"]
        setTimesReport(prevState => [
            ...prevState,
            {
                ["name"]: name,
                ["time"]: timeToAddToState[0]
            }]
        )
    }

    // transform a string of hours in a date object
    const transformHours = (stringHour) => {
        let splitedHours = stringHour.split(":")
        return new Date(0, 0, 0, splitedHours[0], splitedHours[1])
    }

    // transform a string of hours in decimal
    const transformHoursInDecimals = (stringHour) => {
        let splitedHours = stringHour.split(":")
        let hours = parseInt(splitedHours[0])
        let minutes = parseInt(splitedHours[1])
        return hours + roundWithDecimals(minutes / 60, 2)
    }

    // round value
    const roundWithDecimals = (value, numberOfDecimals) => {
        return Math.round(value * Math.pow(10, numberOfDecimals)) / Math.pow(10, 2)
    }

    // check if a time is bigger that other
    const time1IsBiggerThanTime0 = (time0, time1) => {
        return transformHours(time1).getTime() > transformHours(time0).getTime() ? true : false
    }

    // get diference between 2 time objects
    const differenceBetweenTimes = (time0, time1) => {
        let totalHour = 0
        totalHour = transformHours(time1).getTime() - transformHours(time0).getTime()
        return totalHour = totalHour / 1000 / 3600
    }

    // calculate total of hours
    const calcHours = (normalHoursDay, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch) => {
        let totalHour = 0
        let totalNormalHours = 0
        let totalExtra50 = 0
        let totalExtra100 = 0

        if (time1IsBigger) totalHour = totalHoursBeforeLunch
        if (time3IsBigger) totalHour += totalHoursAfterLunch

        const normalHoursDayDecimal = transformHoursInDecimals(normalHoursDay)
        if(differenceBetweenTimes(normalHoursDay, "00:00") === 0) {
            if (time1IsBigger) totalExtra100 = totalHoursBeforeLunch
            if (time3IsBigger) totalExtra100 += totalHoursAfterLunch
        } else {
            if (time1IsBigger) {
                totalNormalHours = totalHoursBeforeLunch
                if (totalNormalHours > normalHoursDayDecimal) {
                    totalExtra50 = totalNormalHours - normalHoursDayDecimal
                    totalNormalHours = normalHoursDayDecimal
                }
            }
            if (time3IsBigger) {
                totalNormalHours += totalHoursAfterLunch
                if (totalNormalHours > normalHoursDayDecimal) {
                    totalExtra50 = totalNormalHours - normalHoursDayDecimal
                    totalNormalHours = normalHoursDayDecimal
                }
            }
        }
        return [roundWithDecimals(totalHour, 2), roundWithDecimals(totalNormalHours, 2), roundWithDecimals(totalExtra50, 2), roundWithDecimals(totalExtra100, 2)]
    }

    // return total of hours, extra hours 50% and extra hours 100%
    const getHoursPerDay = (time0, time1, time2, time3, dayOfTime) => {
        let time1IsBigger = false
        let time3IsBigger = false
        let totalHoursBeforeLunch = 0
        let totalHoursAfterLunch = 0
        
        time1IsBiggerThanTime0(time0, time1) ? time1IsBigger = true : time1IsBigger = false
        time1IsBiggerThanTime0(time2, time3) ? time3IsBigger = true : time3IsBigger = false
        totalHoursBeforeLunch = differenceBetweenTimes(time0, time1)
        totalHoursAfterLunch = differenceBetweenTimes(time2, time3)

        switch (daysReport[dayOfTime].getDay()) {
            case 0:
                return calcHours(reportFromBackEnd.hoursSunday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            case 1:
                return calcHours(reportFromBackEnd.hoursMonday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            case 2:
                return calcHours(reportFromBackEnd.hoursTuesday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            case 3:
                return calcHours(reportFromBackEnd.hoursWednesday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            case 4:
                return calcHours(reportFromBackEnd.hoursThursday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            case 5:
                return calcHours(reportFromBackEnd.hoursFriday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            case 6:
                return calcHours(reportFromBackEnd.hoursSaturday, time1IsBigger, time3IsBigger, totalHoursBeforeLunch, totalHoursAfterLunch)
            default:
                break
        }
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
            setIsComponentDataLoading(false)
        }
    }, [timesReport])

    
    const handleChange = e => {
        const { name, value } = e.target
        let idTimeInTimesReport = 0
        let timesReportCopy = [...timesReport]
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
        for (const timeOfState  in timesReport) {
            let dateSplited = timesReport[timeOfState].name.split("-")
            let scheduleReportApi = dateSplited[3]
            let timeSplited = timesReport[timeOfState].time.split(":")
            let dateTimeReportTime = new Date(dateSplited[0], dateSplited[1], dateSplited[2], timeSplited[0], timeSplited[1])
            timesForApi.push({
                dateRegister: `${dateTimeReportTime.getFullYear()}-${dateTimeReportTime.getMonth()}-${dateTimeReportTime.getDate()}`,
                schedule: scheduleReportApi,
                timeRegister: `${dateTimeReportTime.getHours()}:${dateTimeReportTime.getMinutes()}`,
                report_id: idReportParams
            })
        }
        const listOfData = { listOfData: timesForApi}
        dispatch(addTimeReport(listOfData))
    }

    if (!isComponentDataLoading) {
        return (
            <div className="content times-report-page">
                <h1 className="title-page">Time Report Of {reportFromBackEnd.employeeName}</h1>
                <h4 className="text-date-report">Date: {reportFromBackEnd.shortDates}</h4>
                <div className="totals-of-report">
                    <label>Total of Worked Hours</label>
                    <div className="display-results-table">
                        {totalHoursDay.length !== 0 ?
                            <input type="text" value={roundWithDecimals(totalHoursDay.reduce((a, b) => a + b, 0), 2)} readOnly tabIndex={-1} /> :
                            <input type="text" value="0" readOnly tabIndex={-1} />
                        }
                    </div>
                    <label>Total of Normal Hours</label>
                    <div className="display-results-table">
                        {totalNormalHours.length !== 0 ?
                            <input type="text" value={roundWithDecimals(totalNormalHours.reduce((a, b) => a + b, 0), 2)} readOnly tabIndex={-1} /> :
                            <input type="text" value="0" readOnly tabIndex={-1} />
                        }
                    </div>
                    <label>Total of Extra 50% Hours</label>
                    <div className="display-results-table">
                        {totalExtraHours50.length !== 0 ?
                            <input type="text" value={roundWithDecimals(totalExtraHours50.reduce((a, b) => a + b, 0), 2)} readOnly tabIndex={-1} /> :
                            <input type="text" value="0" readOnly tabIndex={-1} />
                        }
                    </div>
                    <label>Total of Extra 100% Hours</label>
                    <div className="display-results-table">
                        {totalExtraHours100.length !== 0 ?
                            <input type="text" value={roundWithDecimals(totalExtraHours100.reduce((a, b) => a + b, 0), 2)} readOnly tabIndex={-1} /> :
                            <input type="text" value="0" readOnly tabIndex={-1} />
                        }
                    </div>
                </div>

                    <table className="times-report-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Entry</th>
                                <th>Entry Lunch</th>
                                <th>Out Lunch</th>
                                <th>Out</th>
                                <th>Total Hours</th>
                                <th>Total Normal</th>
                                <th>Total Extra 50%</th>
                                <th>Total Extra 100%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timesReport != null && timesReport.length !== 0 ?
                                (daysReport.map((date, i) => (
                                    <tr key={i}>
                                        <td>
                                            {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} - ${daysWeek[date.getDay()]}`}
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
                                            <div className="display-results-table">
                                                {totalHoursDay.length !== 0 ?
                                                    <input type="text" value={totalHoursDay[i]} className="display-total-hours" readOnly tabIndex={-1} /> :
                                                    <input type="text" value="0.00" className="display-total-hours" readOnly tabIndex={-1} />
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="display-results-table">
                                                {totalNormalHours.length !== 0 ?
                                                    <input type="text" value={totalNormalHours[i]} className="display-total-hours" readOnly tabIndex={-1} /> :
                                                    <input type="text" value="0.00" className="display-total-hours" readOnly tabIndex={-1} />
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="display-results-table">
                                                {totalExtraHours50.length !== 0 ?
                                                    <input type="text" value={totalExtraHours50[i]} className="display-total-hours" readOnly tabIndex={-1} /> :
                                                    <input type="text" value="0.00" className="display-total-hours" readOnly tabIndex={-1} />
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="display-results-table">
                                                {totalExtraHours100.length !== 0 ?
                                                    <input type="text" value={totalExtraHours100[i]} className="display-total-hours" readOnly tabIndex={-1} /> :
                                                    <input type="text" value="0.00" className="display-total-hours" readOnly tabIndex={-1} />
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : <tr></tr>
                        }
                        </tbody>
                    </table>
                   
                <button className="submit-button button-times" onClick={handleSubmit}>Submit</button>
            </div>
        )
    } else {
        return <h3>Loading...</h3>
    }
        
}