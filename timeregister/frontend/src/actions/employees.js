import axios from 'axios'
import { tokenConfig } from './auth'
import { GET_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE } from './types'


// GET EMPLOYEES
export const getEmployees = () => (dispatch, getState) => {
    axios.get('/api/employee/', tokenConfig(getState))
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