import axios from 'axios'
import { tokenConfig } from './auth'
import { GET_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE } from './types'
import { returnSuccess, returnErrors } from './messages'


// GET EMPLOYEES
export const getEmployees = () => (dispatch, getState) => {
    axios.get('/api/employee/', tokenConfig(getState))
    .then(res => {
        dispatch({
                type: GET_EMPLOYEES,
                payload: res.data.data
            })
        })
        .catch(
            err => dispatch(returnErrors(err.response.data, err.response.status))
        )
}


// ADD EMPLOYEE
export const addEmployee = (employee) => (dispatch, getState) => {
    axios.post("api/employee/", employee, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_EMPLOYEE,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status))})
}


// DELETE EMPLOYEE
export const deleteEmployee = (id) => (dispatch, getState) => {
    axios.delete(`/api/employee/${id}/`, tokenConfig(getState))
        .then(res => {
            console.log(res)
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: id
            })
            dispatch(returnSuccess("employee deleted", res.status))
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}