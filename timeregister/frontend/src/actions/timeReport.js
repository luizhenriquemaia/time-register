import axios from 'axios'
import { returnErrors, returnSuccess } from './messages'
import { GET_TIME_REPORTS, GET_TIME_REPORTS_WITH_REPORT, DELETE_TIME_REPORT, ADD_TIME_REPORT } from './types'


export const getTimeReport = () => dispatch => {
    axios.get('/api/time-report/')
        .then(res => {
            dispatch({
                type: GET_TIME_REPORTS,
                payload: res.data.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}

export const getTimeReportWithReport = (idReport) => dispatch => {
    axios.get(`/api/time-report/?report=${idReport}`)
        .then(res => {
            dispatch({
                type: GET_TIME_REPORTS_WITH_REPORT,
                payload: res.data.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}

export const addTimeReport = (timeReport) => dispatch => {
    axios.post("api/time-report/", timeReport)
        .then(res => {
            dispatch({ 
                type: ADD_TIME_REPORT,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}