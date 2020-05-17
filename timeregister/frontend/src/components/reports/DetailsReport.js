import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// actions
import { getDetailsReport } from '../../actions/detailsReport'



export default function DetailsReport() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [idReport, setIdReport] = useState(0)
    
    // get state from history.push
    useEffect(() => {
        setIdReport(location.idReportState)
        console.log(idReport)
    }, [location])

    // get details from report
    useEffect(() => {
        if (idReport == 0){   
        }
        else {
            dispatch(getDetailsReport(idReport))
        }
    }, [idReport])
    const detailsReport = useSelector(state => state.detailsReport.detailsReport)
    

    return (
        <div className="content">
            <h1 className="title-page">Details Report {detailsReport.id}</h1>
        </div>
    )
}