import { GET_TIME_REGISTERS, DELETE_REGISTER, ADD_REGISTER } from '../actions/types.js'


const initialState = {
    timeRegister: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TIME_REGISTERS:
            return {
                ...state,
                timeRegister: action.payload
            }
        case DELETE_REGISTER:
            return {
                ...state,
                timeRegister: state.timeRegister.filter(timeRegister => timeRegister.id !== action.payload)
            }
        case ADD_REGISTER:
            return {
                ...state,
                timeRegister: [...state.timeRegister, action.payload]
            }
        default:
            return state
    }
}