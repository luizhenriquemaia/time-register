import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL  } from './types'


export const tokenConfig = getState => {
    const token = getState().auth.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
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
            console.log(err.response.data.detail, err.response.status)
            //dispatch(returnErrors(err.response.data.detail, err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}
