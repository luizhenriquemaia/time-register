import { GET_DETAILS_REPORT, DELETE_DETAIL_REPORT, ADD_DETAIL_REPORT } from '../actions/types.js'


const initialState = {
    detailsReport: [],
    isDetailsAdded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DETAILS_REPORT:
            return {
                ...state,
                detailsReport: action.payload
            }
        case DELETE_DETAIL_REPORT:
            console.log(action.payload)
            return {
                ...state,
                detailsReport: state.detailsReport.filter(detailsReport => detailsReport.id !== action.payload)
            }
        case ADD_DETAIL_REPORT:
            return {
                ...state,
                detailsReport: [...state.detailsReport, action.payload],
                isDetailsAdded: true
            }
        default:
            return state
    }
}