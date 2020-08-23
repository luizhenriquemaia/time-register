import axios from 'axios'
import { tokenConfig } from './auth'
import { returnErrors } from './messages'
import { GET_TYPE_CONTRACT, DELETE_TYPE_CONTRACT, ADD_TYPE_CONTRACT } from './types'


// GET EMPLOYEES
export const getTypeContracts = () => (dispatch, getState) => {
    axios.get('/api/type-contract/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TYPE_CONTRACT,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
}