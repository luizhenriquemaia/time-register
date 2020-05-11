import axios from 'axios'
import { GET_TIME_REGISTERS, DELETE_REGISTER, ADD_REGISTER } from './types'
// import { createMessage, returnErrors } from './messages'


// GET LEADS
// we can create a function inside the getLeads to dispatch action but the simple way is passing like this
export function getTimeRegisters() {
    return dispatch => {
        axios.get('/api/time/')
            .then(res => {
                dispatch({
                    type: GET_TIME_REGISTERS,
                    payload: res.data
                })
                console.log(res.data)
            })
            .catch(
                err => dispatch(returnErrors(err.response.data, err.response.status))
                )
    }
}
/* export const getTimeRegisters = () => dispatch => {
    console.log("get api time")
    axios.get('/api/time/')
        .then(res => {
            dispatch({
                type: GET_TIME_REGISTERS,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(
            console.log(err),
            err => dispatch(returnErrors(err.response.data, err.response.status)))
} */


/* // DELETE LEAD
export const deleteLead = (id) => dispatch => {
    axios.delete(`/api/leads/${id}/`)
        .then(res => {
            dispatch(createMessage({ deleteLead: "Lead Deleted" }))
            dispatch({
                type: DELETE_LEAD,
                payload: id
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


// ADD LEAD
export const addLead = (lead) => dispatch => {
    axios.post("/api/leads/", lead)
        .then(res => {
            dispatch(createMessage({ addLead: "Lead Added" }))
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
} */