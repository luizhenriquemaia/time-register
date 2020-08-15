import axios from 'axios'
import { returnErrors, returnSuccess } from './messages'
import { GET_REPORTS, GET_REPORT, DELETE_REPORT, ADD_REPORT } from './types'


// GET REPORTS
export function getReports() {
    return dispatch => {
        axios.get('/api/report/')
            .then(res => {
                dispatch({
                    type: GET_REPORTS,
                    payload: res.data.data
                })
                dispatch(returnSuccess(res.data.message, res.status))
            })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
    }
}

// RETRIEVE REPORT
export function getReport(report) {
    return dispatch => {
        axios.get(`/api/report/${report}`)
            .then(res => {
                dispatch({
                    type: GET_REPORT,
                    payload: res.data.data
                })
                dispatch(returnSuccess(res.data.message, res.status))
            })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
    }
}

// ADD REPORT
export const addReport = (report) => {
    return dispatch => {
        axios.post("api/report/", report)
            .then(res => {
                dispatch({
                    type: ADD_REPORT,
                    payload: res.data.data
                })
                dispatch(returnSuccess(res.data.message, res.status))
            })
            .catch(err => dispatch(returnErrors(err.response.message, err.response.status)))
    }
}

// DELETE REPORT
export const deleteReport = (id) => {
    return dispatch => {
        axios.delete(`/api/report/${id}/`)
            .then(res => {
                dispatch({
                    type: DELETE_REPORT,
                    payload: id
                })
                dispatch(returnSuccess(res.data.message, res.status))
            })
            .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
    }
}