import { GET_REPORTS, DELETE_REPORT, ADD_REPORT } from '../actions/types.js'



const initialState = {
    report: [],
    isReportAdded: false,
    isLoading: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REPORTS:
            return {
                ...state,
                report: action.payload,
                isLoading: false
            }
        case DELETE_REPORT:
            return {
                ...state,
                report: state.report.filter(report => report.id !== action.payload)
            }
        case ADD_REPORT:
            return {
                ...state,
                report: [...state.report, action.payload],
                isReportAdded: true
            }
        default:
            return state
    }
}