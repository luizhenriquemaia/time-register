import { GET_TYPE_CONTRACT, ADD_TYPE_CONTRACT } from '../actions/types.js'


const initialState = {
    typeContract: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TYPE_CONTRACT:
            return {
                ...state,
                typeContract: action.payload
            }
        case ADD_TYPE_CONTRACT:
            return {
                ...state,
                typeContract: [...state.typeContract, action.payload]
            }
        default:
            return state
    }
}