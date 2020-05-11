import axios from 'axios'
import { GET_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE } from './types'


// GET EMPLOYEES
export function getEmployees() {
    return dispatch => {
        axios.get('/api/employee/')
            .then(res => {
                dispatch({
                    type: GET_EMPLOYEES,
                    payload: res.data
                })
            })
            .catch(
                err => dispatch(returnErrors(err.response.data, err.response.status))
            )
    }
}