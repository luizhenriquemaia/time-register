import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, AUTH_ERROR } from '../actions/types'


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}


export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state
    }
}