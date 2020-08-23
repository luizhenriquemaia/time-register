import { GET_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE } from '../actions/types.js'


const initialState = {
    employee: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            if (action.payload.legth === undefined) {
                return {
                    ...state,
                    employee: []
                }
            } else {
                return {
                    ...state,
                    employee: action.payload
                }
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employee: state.employee.filter(employee => employee.id !== action.payload)
            }
        case ADD_EMPLOYEE:
            return {
                ...state,
                employee: [...state.employee, action.payload]
            }
        default:
            return state
    }
}