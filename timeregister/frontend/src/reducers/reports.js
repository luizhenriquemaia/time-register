import { GET_REPORTS, GET_REPORT, DELETE_REPORT, ADD_REPORT } from '../actions/types.js'



const initialState = {
    report: [],
    isReportAdded: false,
    isListOfReports: false,
    isObjectReport: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REPORTS:
            return {
                ...state,
                report: action.payload,
                isListOfReports: true,
                isObjectReport: false
            }
        case GET_REPORT:
            return {
                ...state,
                report: action.payload,
                isListOfReports: false,
                isObjectReport: true
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