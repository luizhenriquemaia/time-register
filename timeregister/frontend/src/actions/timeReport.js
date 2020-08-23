import axios from 'axios'
import { tokenConfig } from './auth'
import { returnErrors, returnSuccess } from './messages'
import { GET_TIME_REPORTS, GET_TIME_REPORTS_WITH_REPORT, DELETE_TIME_REPORT, ADD_TIME_REPORT } from './types'


export const getTimeReport = () => (dispatch, getState) => {
    axios.get('/api/time-report/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TIME_REPORTS,
                payload: res.data.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}

export const getTimeReportWithReport = (idReport) => (dispatch, getState) => {
    axios.get(`/api/time-report/?report=${idReport}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TIME_REPORTS_WITH_REPORT,
                payload: res.data.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}

export const addTimeReport = (timeReport) => (dispatch, getState) => {
    axios.post("api/time-report/", timeReport, tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({ 
                type: ADD_TIME_REPORT,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
        .catch(err => {
            console.log(err.response)
            dispatch(returnErrors(err.response.data.message, err.response.status))})
}