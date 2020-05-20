import { GET_TIME_REPORTS, DELETE_TIME_REPORT, ADD_TIME_REPORT } from '../actions/types.js'


const initialState = {
    timeReport: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TIME_REPORTS:
            return {
                ...state,
                timeReport: action.payload
            }
        case DELETE_TIME_REPORT:
            return {
                ...state,
                timeReport: state.timeReport.filter(timeReport => timeReport.id !== action.payload)
            }
        case ADD_TIME_REPORT:
            return {
                ...state,
                timeReport: [...state.timeReport, action.payload]
            }
        default:
            return state
    }
}