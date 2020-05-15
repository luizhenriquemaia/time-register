import axios from 'axios'
import { GET_DETAILS_REPORT, DELETE_DETAIL_REPORT, ADD_DETAIL_REPORT } from './types'
// import { createMessage, returnErrors } from './messages'


// GET REPORT
export function getDetailsReport(idReport) {
    return dispatch => {
        axios.get(`/api/report/${idReport}`)
            .then(res => {
                dispatch({
                    type: GET_DETAILS_REPORT,
                    payload: res.data
                })
            })
            .catch(
                err => dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}