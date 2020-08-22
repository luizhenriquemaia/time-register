import axios from 'axios'
import { returnErrors, returnSuccess } from './messages'
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_USER} from './types'


export const tokenConfig = getState => {
    const token = getState().auth.access
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const token = getState().auth.access
    const requestBody = JSON.stringify({ token })
    axios.post('api/auth/token/verify/', requestBody, config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}


export const loginUser = (username, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const requestBody = JSON.stringify({ username, password })
    axios.post('/api/auth/token/', requestBody, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data.detail, err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logoutUser = () => (dispatch, getState) => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}


export const registerUser = (newUser) => {
    return dispatch => {
        axios.post('/api/auth/register/', newUser)
            .then(res => {
                dispatch({
                    type: REGISTER_USER,
                    payload: res.data.data
                })
                dispatch(returnSuccess(res.data.message, res.status))
            }).catch(err => dispatch(returnErrors(err.response.data.message, err.response.status)))
    }
}