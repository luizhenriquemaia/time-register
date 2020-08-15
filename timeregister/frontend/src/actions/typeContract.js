import axios from 'axios'
import { returnErrors } from './messages'
import { GET_TYPE_CONTRACT, DELETE_TYPE_CONTRACT, ADD_TYPE_CONTRACT } from './types'


// GET EMPLOYEES
export function getTypeContracts() {
    return dispatch => {
        axios.get('/api/type-contract/')
            .then(res => {
                dispatch({
                    type: GET_TYPE_CONTRACT,
                    payload: res.data
                })
            })
            .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
    }
}