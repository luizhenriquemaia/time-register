import axios from 'axios'
import { tokenConfig } from './auth'
import { returnErrors, returnSuccess } from './messages'
import { GET_TYPE_CONTRACT, ADD_TYPE_CONTRACT } from './types'


export const getTypeContracts = () => (dispatch, getState) => {
    axios.get('/api/type-contract/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TYPE_CONTRACT,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status))})
}


export const addTypeContract = (typeContract) => (dispatch, getState) => {
    axios.post("api/type-contract/", typeContract, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_TYPE_CONTRACT,
                payload: res.data.data
            })
            dispatch(returnSuccess(res.data.message, res.status))
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data.message, err.response.status))
        })
}