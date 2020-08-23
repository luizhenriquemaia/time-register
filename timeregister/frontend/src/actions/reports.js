import axios from 'axios'
import { tokenConfig } from './auth'
import { returnErrors, returnSuccess } from './messages'
import { GET_REPORTS, GET_REPORT, DELETE_REPORT, ADD_REPORT } from './types'


// GET REPORTS
export const getReports = () => (dispatch, getState) => {
    axios.get('/api/report/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORTS,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
    .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}

// RETRIEVE REPORT
export const getReport = (report) => (dispatch, getState) => {
    axios.get(`/api/report/${report}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_REPORT,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
    .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}

// ADD REPORT
export const addReport = (report) => (dispatch, getState) => {
    axios.post("api/report/", report, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_REPORT,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
        .catch(err => dispatch(returnErrors(err.response.message, err.response.status)))
}

// DELETE REPORT
export const deleteReport = (id) => (dispatch, getState) => {
    axios.delete(`/api/report/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_REPORT,
                payload: id
            })
            dispatch(returnSuccess("report deleted", res.status))
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}