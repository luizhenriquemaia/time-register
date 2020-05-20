import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// actions
//import { getDetailsReport } from '../../actions/detailsReport'



export default function DetailsReport() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [idReport, setIdReport] = useState(0)
    
    // get state from history.push
    useEffect(() => {
        setIdReport(location.idReportState)
        console.log(idReport)
    }, [location])

    /* // get details from report
    useEffect(() => {
        if (idReport == 0){   
        }
        else {
            dispatch(getDetailsReport(idReport))
        }
    }, [idReport])
    const detailsReport = useSelector(state => state.detailsReport.detailsReport) */
    

    return (
        <div className="content">
            <h1 className="title-page">Time Report</h1>
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