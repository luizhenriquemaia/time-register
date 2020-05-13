import axios from 'axios'
import { GET_REPORTS, DELETE_REPORT, ADD_REPORT } from './types'
// import { createMessage, returnErrors } from './messages'


// GET REPORT
export function getReports() {
    return dispatch => {
        axios.get('/api/report/')
            .then(res => {
                dispatch({
                    type: GET_REPORTS,
                    payload: res.data
                })
                console.log(res.data)
            })
            .catch(
                err => dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}

// ADD REPORT
export const addReport = (report) => {
    return dispatch => {
        axios.post("api/report/", report)
            .then(res => {
                dispatch({
                    type: ADD_REPORT,
                    payload: res.data
                })
                console.log("added report")
                console.log(res.data)
            })
            //.catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
            .catch(err => console.log(err))
    }
}