import { GET_REPORTS, DELETE_REPORT, ADD_REPORT } from '../actions/types.js'


const initialState = {
    report: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REPORTS:
            return {
                ...state,
                report: action.payload
            }
        case DELETE_REPORT:
            return {
                ...state,
                report: state.report.filter(report => report.id !== action.payload)
            }
        case ADD_REPORT:
            return {
                ...state,
                report: [...state.report, action.payload]
            }
        default:
            return state
    }
}